import type {
  CameraMovement,
  ChecklistItem,
  EditStep,
  RecordingSettings,
  Shot,
  ShootBrief,
  ShootingPlan,
  TransitionSuggestion,
} from "@/lib/types";
import {
  getDevice,
  getExperience,
  getStabilization,
} from "./devices";
import { getStyle } from "./styles";
import { getSubject } from "./subjects";
import type { ShotRole, ShotTemplate, StyleProfile } from "./vocabulary";

/* -------------------------------------------------------------------------- */
/* Deterministic randomness                                                   */
/* -------------------------------------------------------------------------- */

/**
 * The same brief must always produce the same plan — it makes the output
 * testable and means a user who regenerates by accident does not lose their
 * plan. `variant` lets the UI deliberately ask for a different take.
 */
function seedFrom(brief: ShootBrief, variant: number): number {
  const key = [
    brief.subject,
    brief.customSubject ?? "",
    brief.device,
    brief.style,
    brief.durationSec,
    brief.experience,
    brief.stabilization,
    variant,
  ].join("|");

  let h = 2166136261;
  for (let i = 0; i < key.length; i += 1) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* -------------------------------------------------------------------------- */
/* Shot selection                                                             */
/* -------------------------------------------------------------------------- */

const ROLE_RANK: Record<ShotRole, number> = {
  establish: 0,
  approach: 1,
  hero: 2,
  detail: 3,
  motion: 4,
  human: 5,
  closer: 6,
};

/**
 * Walks the style's role order and fills each slot with the best unused shot
 * for that role, preferring shots at or below the user's difficulty ceiling.
 * Falls back to any remaining shot so we always hit the target count.
 */
function selectShots(
  pool: ShotTemplate[],
  style: StyleProfile,
  targetCount: number,
  maxDifficulty: number,
  random: () => number,
): ShotTemplate[] {
  const used = new Set<string>();
  const picked: ShotTemplate[] = [];

  const takeForRole = (role: ShotRole): ShotTemplate | null => {
    const candidates = pool.filter((s) => !used.has(s.key) && s.role === role);
    if (candidates.length === 0) return null;

    const withinLimit = candidates.filter((s) => s.difficulty <= maxDifficulty);
    const from = withinLimit.length > 0 ? withinLimit : candidates;
    const choice = from[Math.floor(random() * from.length)] ?? from[0];
    if (!choice) return null;
    used.add(choice.key);
    return choice;
  };

  const takeAny = (): ShotTemplate | null => {
    const candidates = pool.filter((s) => !used.has(s.key));
    if (candidates.length === 0) return null;
    const withinLimit = candidates.filter((s) => s.difficulty <= maxDifficulty);
    const sorted = (withinLimit.length > 0 ? withinLimit : candidates).sort(
      (a, b) => ROLE_RANK[a.role] - ROLE_RANK[b.role],
    );
    const choice = sorted[0];
    if (!choice) return null;
    used.add(choice.key);
    return choice;
  };

  // Pass over the role order as many times as needed to reach the target.
  let guard = 0;
  while (picked.length < targetCount && guard < 50) {
    guard += 1;
    let progressed = false;
    for (const role of style.roleOrder) {
      if (picked.length >= targetCount) break;
      const shot = takeForRole(role);
      if (shot) {
        picked.push(shot);
        progressed = true;
      }
    }
    if (!progressed) {
      const extra = takeAny();
      if (!extra) break;
      picked.push(extra);
    }
  }

  // A closer always ends the sequence; an establishing shot always opens it.
  const closers = picked.filter((s) => s.role === "closer");
  const openers = picked.filter((s) => s.role === "establish");
  const middle = picked.filter((s) => s.role !== "closer" && s.role !== "establish");

  return [...openers.slice(0, 1), ...middle, ...openers.slice(1), ...closers];
}

/* -------------------------------------------------------------------------- */
/* Duration allocation                                                        */
/* -------------------------------------------------------------------------- */

const MIN_SHOT_SEC = 1;

/**
 * Distributes the total runtime across shots by relative weight, snapped to
 * half-seconds, then corrects the rounding error on the longest shot so the
 * durations always sum to exactly the requested total.
 */
function allocateDurations(
  weights: number[],
  totalSec: number,
  pacingBias: number,
): number[] {
  if (weights.length === 0) return [];

  const biased = weights.map((w) => Math.max(0.1, w * pacingBias));
  const sum = biased.reduce((a, b) => a + b, 0);

  const raw = biased.map((w) => (w / sum) * totalSec);
  const snapped = raw.map((d) => Math.max(MIN_SHOT_SEC, Math.round(d * 2) / 2));

  let drift = totalSec - snapped.reduce((a, b) => a + b, 0);

  // Apply the correction in 0.5s steps, starting with the longest shots so a
  // short detail shot is never stretched or crushed by the fix-up.
  const byLength = snapped
    .map((d, i) => ({ d, i }))
    .sort((a, b) => b.d - a.d)
    .map((x) => x.i);

  let cursor = 0;
  let guard = 0;
  while (Math.abs(drift) >= 0.5 && guard < 400) {
    guard += 1;
    const idx = byLength[cursor % byLength.length];
    cursor += 1;
    if (idx === undefined) break;
    const current = snapped[idx];
    if (current === undefined) break;

    const step = drift > 0 ? 0.5 : -0.5;
    if (step < 0 && current + step < MIN_SHOT_SEC) continue;
    snapped[idx] = current + step;
    drift -= step;
  }

  return snapped;
}

/* -------------------------------------------------------------------------- */
/* Movement adaptation                                                        */
/* -------------------------------------------------------------------------- */

interface AdaptedMovement {
  movement: CameraMovement;
  /** Set when we changed the template's movement, so the UI can explain why. */
  note: string | null;
}

function adaptMovement(
  movement: CameraMovement,
  stabilizationId: ShootBrief["stabilization"],
): AdaptedMovement {
  const rig = getStabilization(stabilizationId);
  if (rig.supports.includes(movement)) return { movement, note: null };

  // Prefer a near-equivalent the rig can actually execute.
  const preferences: Partial<Record<CameraMovement, CameraMovement[]>> = {
    orbit: ["pan", "push-in", "handheld-drift"],
    tracking: ["pan", "push-in", "handheld-drift"],
    reveal: ["pan", "push-in", "handheld-drift"],
    "push-in": ["tilt", "pan", "static"],
    "pull-out": ["tilt", "pan", "static"],
    "handheld-drift": ["pan", "static"],
    whip: ["pan", "static"],
  };

  const candidates = preferences[movement] ?? [];
  const replacement =
    candidates.find((m) => rig.supports.includes(m)) ?? rig.fallback;

  return {
    movement: replacement,
    note: `Planned as a ${movement.replace(/-/g, " ")} shot, adapted to a ${replacement.replace(/-/g, " ")} because you are shooting on a ${rig.label.toLowerCase()}.`,
  };
}

/* -------------------------------------------------------------------------- */
/* Recording settings                                                         */
/* -------------------------------------------------------------------------- */

function buildSettings(
  brief: ShootBrief,
  template: ShotTemplate,
  style: StyleProfile,
): RecordingSettings {
  const device = getDevice(brief.device);

  // Slow-motion candidates get a higher capture frame rate than the timeline.
  const wantsSlowMo =
    template.movement === "whip" ||
    template.role === "motion" ||
    template.key.includes("whip") ||
    template.key.includes("movement");

  const frameRate = wantsSlowMo
    ? `${style.frameRate} timeline — shoot this one at 60 fps so you can slow it to 50%`
    : style.frameRate;

  const tightFraming =
    template.framing === "close-up" || template.framing === "extreme-close-up";

  return {
    resolution: device.resolution,
    frameRate,
    aspectRatio: style.aspectRatio,
    deviceHint: device.settingsPath,
    exposure: device.exposureHint,
    focus: tightFraming
      ? `${device.focusHint} This shot is tight, so locking focus matters more than usual.`
      : device.focusHint,
    whiteBalance: device.whiteBalanceHint,
    lens: tightFraming
      ? `${device.lensHint} For this close framing, step back and zoom in slightly rather than pushing the lens right up to the subject.`
      : device.lensHint,
    audio: device.audioHint,
  };
}

/* -------------------------------------------------------------------------- */
/* Transitions                                                                */
/* -------------------------------------------------------------------------- */

function pickTransition(
  style: StyleProfile,
  index: number,
  nextTemplate: ShotTemplate | undefined,
  random: () => number,
): TransitionSuggestion {
  const options = style.transitions;
  const fallback: TransitionSuggestion = {
    name: "Straight cut",
    how: "Cut directly from this shot to the next with no effect.",
    kind: "cut",
  };
  if (options.length === 0) return fallback;

  // A reveal in the next shot is itself a transition, so cut plainly into it.
  if (nextTemplate?.movement === "reveal") {
    return (
      options.find((t) => t.kind === "cut") ?? options[0] ?? fallback
    );
  }

  // Keep in-camera transitions rare — they have to be shot deliberately.
  const inCamera = options.filter((t) => t.kind === "in-camera");
  const rest = options.filter((t) => t.kind !== "in-camera");
  const useInCamera = inCamera.length > 0 && index > 0 && random() < 0.25;
  const from = useInCamera ? inCamera : rest.length > 0 ? rest : options;

  return from[index % from.length] ?? options[0] ?? fallback;
}

/* -------------------------------------------------------------------------- */
/* Main entry point                                                           */
/* -------------------------------------------------------------------------- */

export interface GenerateOptions {
  /** Bump to get a different arrangement from the same brief. */
  variant?: number;
  /** Injected for tests; defaults to now. */
  now?: () => Date;
  idPrefix?: string;
}

/**
 * Builds a complete shooting plan from a brief using the bundled shot library.
 *
 * This is a pure function: no network, no AI. The returned plan is labelled
 * `source: { kind: "template" }` so the UI can describe it accurately.
 */
export function buildTemplatePlan(
  brief: ShootBrief,
  options: GenerateOptions = {},
): ShootingPlan {
  const { variant = 0 } = options;
  const now = options.now?.() ?? new Date();
  const generatedAt = now.toISOString();
  const random = mulberry32(seedFrom(brief, variant));

  const subject = getSubject(brief.subject);
  const style = getStyle(brief.style);
  const device = getDevice(brief.device);
  const experience = getExperience(brief.experience);
  const rig = getStabilization(brief.stabilization);

  const subjectLabel =
    brief.subject === "custom" && brief.customSubject?.trim()
      ? brief.customSubject.trim()
      : subject.label;

  // Never ask for more shots than the subject library can supply distinctly —
  // repeating a shot would be worse than running one shot slightly longer.
  const targetCount = Math.min(
    style.shotCount[brief.durationSec],
    subject.shots.length,
  );
  const templates = selectShots(
    subject.shots,
    style,
    targetCount,
    experience.maxDifficulty,
    random,
  );

  const durations = allocateDurations(
    templates.map((t) => t.weight),
    brief.durationSec,
    style.pacingBias,
  );

  const planId = `${options.idPrefix ?? "plan"}_${seedFrom(brief, variant).toString(36)}`;

  const shots: Shot[] = templates.map((template, index) => {
    const adapted = adaptMovement(template.movement, brief.stabilization);
    const durationSec = durations[index] ?? MIN_SHOT_SEC;
    const isLast = index === templates.length - 1;

    const howTo = [...template.howTo];
    if (adapted.note) howTo.push(adapted.note);
    if (experience.coaching) howTo.push(experience.coaching);

    const checklist: ChecklistItem[] = template.checklist.map((label, i) => ({
      id: `${template.key}_c${i}`,
      label,
    }));

    return {
      id: `${planId}_${template.key}`,
      order: index + 1,
      slate: `${index + 1}A`,
      title: template.title,
      purpose: template.purpose,
      durationSec,
      framing: template.framing,
      angle: template.angle,
      movement: adapted.movement,
      howTo,
      lighting: template.lighting,
      settings: buildSettings(brief, template, style),
      transitionOut: isLast
        ? undefined
        : pickTransition(style, index, templates[index + 1], random),
      checklist,
      art: {
        silhouette: subject.silhouette,
        framing: template.framing,
        angle: template.angle,
        movement: adapted.movement,
        thirds: template.thirds ?? false,
        subjectX: template.subjectX ?? 0.5,
      },
      difficulty: template.difficulty,
      watchOutFor: template.watchOutFor,
    };
  });

  const editSteps: EditStep[] = style.editSteps.map((step, i) => ({
    id: `${planId}_e${i}`,
    title: step.title,
    detail: step.detail,
  }));

  const prepChecklist: ChecklistItem[] = [
    ...subject.prep,
    `Set your camera to ${device.resolution} at ${style.frameRate}.`,
    "Clean the lens with a soft cloth.",
    "Check you have at least 20% battery and 2 GB of free storage.",
  ].map((label, i) => ({ id: `${planId}_p${i}`, label }));

  const totalDurationSec = shots.reduce((sum, s) => sum + s.durationSec, 0);

  return {
    id: planId,
    brief,
    title: `${subjectLabel} — ${style.label}`,
    logline: buildLogline(subjectLabel, subject.article, style, brief.durationSec),
    totalDurationSec,
    shots,
    lightingPlan: subject.lightingPlan,
    audio: {
      musicBrief: style.musicBrief,
      bpmRange: style.bpmRange,
      sourcingNote:
        "Use the music library inside TikTok, Reels or YouTube for platform-safe tracks, or a royalty-free source you have the rights to. Never pull audio from a commercial release — it will get muted or taken down.",
      soundDesign: style.soundDesign,
    },
    editSteps,
    exportRecipe: {
      platform: style.platform,
      resolution: "1080 × 1920",
      frameRate: style.frameRate,
      aspectRatio: style.aspectRatio,
      notes: style.exportNotes,
    },
    gearNotes: [...subject.gearNotes, rig.note, device.caveat, style.lookNote],
    prepChecklist,
    source: {
      kind: "template",
      templateId: `${brief.subject}:${brief.style}:${brief.durationSec}:v${variant}`,
      generatedAt,
    },
  };
}

function buildLogline(
  subjectLabel: string,
  article: string,
  style: StyleProfile,
  durationSec: number,
): string {
  const lower = subjectLabel.toLowerCase();
  switch (style.id) {
    case "cinematic":
      return `A ${durationSec}-second cinematic piece on ${lower} — wide, slow and held, built around one hero move.`;
    case "social":
      return `A ${durationSec}-second vertical edit on ${lower} that hooks in the first half-second and cuts hard to the beat.`;
    case "commercial":
      return `A ${durationSec}-second commercial spot that makes ${article} the hero and lands one clear idea.`;
    case "travel":
      return `A ${durationSec}-second travel edit that puts the viewer inside ${lower} rather than just showing it.`;
    default:
      return `A ${durationSec}-second video on ${lower}.`;
  }
}
