import type {
  CameraAngle,
  CameraMovement,
  DeviceId,
  DurationSec,
  ExperienceId,
  FramingSize,
  ShotDifficulty,
  SilhouetteId,
  StabilizationId,
  StyleId,
  SubjectId,
} from "@/lib/types";

/* -------------------------------------------------------------------------- */
/* Shot templates                                                             */
/* -------------------------------------------------------------------------- */

/**
 * The narrative job a shot does in the edit. The style grammar orders shots by
 * role, which is what makes a generated plan feel sequenced rather than random.
 */
export type ShotRole =
  | "establish"
  | "approach"
  | "hero"
  | "detail"
  | "motion"
  | "human"
  | "closer";

/**
 * A shot before it is resolved against a brief. Durations are expressed as a
 * relative `weight` so the same template works at 15s and 60s.
 */
export interface ShotTemplate {
  key: string;
  title: string;
  purpose: string;
  role: ShotRole;
  framing: FramingSize;
  angle: CameraAngle;
  movement: CameraMovement;
  /** Relative share of the runtime. Normalised during generation. */
  weight: number;
  difficulty: ShotDifficulty;
  howTo: string[];
  lighting: string;
  watchOutFor: string;
  checklist: string[];
  /** 0 = hard left, 0.5 = centre, 1 = hard right. */
  subjectX?: number;
  thirds?: boolean;
}

export interface SubjectProfile {
  id: SubjectId;
  label: string;
  /** Used in loglines and shot titles, e.g. "the car". */
  article: string;
  silhouette: SilhouetteId;
  blurb: string;
  lightingPlan: string[];
  gearNotes: string[];
  prep: string[];
  shots: ShotTemplate[];
}

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

export interface StyleProfile {
  id: StyleId;
  label: string;
  blurb: string;
  /** Narrative order the generator tries to fill. */
  roleOrder: ShotRole[];
  /** Shots per runtime. More shots = faster cutting. */
  shotCount: Record<DurationSec, number>;
  /** Multiplies every shot's weight; <1 shortens, >1 lengthens. */
  pacingBias: number;
  transitions: { name: string; how: string; kind: "cut" | "in-camera" | "edit" }[];
  musicBrief: string;
  bpmRange: string;
  soundDesign: string[];
  aspectRatio: string;
  frameRate: string;
  platform: string;
  exportNotes: string[];
  editSteps: { title: string; detail: string }[];
  /** Shutter/look guidance surfaced in per-shot settings. */
  lookNote: string;
}

/* -------------------------------------------------------------------------- */
/* Devices                                                                    */
/* -------------------------------------------------------------------------- */

export interface DeviceProfile {
  id: DeviceId;
  label: string;
  /** Where the capture controls live on this class of device. */
  settingsPath: string;
  exposureHint: string;
  focusHint: string;
  whiteBalanceHint: string;
  lensHint: string;
  audioHint: string;
  /** Highest sensible capture format for a beginner on this device. */
  resolution: string;
  /** Device-specific caveat worth repeating in the gear notes. */
  caveat: string;
}

/* -------------------------------------------------------------------------- */
/* Experience + stabilization gating                                          */
/* -------------------------------------------------------------------------- */

export interface ExperienceProfile {
  id: ExperienceId;
  label: string;
  description: string;
  /** Shots harder than this are swapped for easier alternatives. */
  maxDifficulty: ShotDifficulty;
  /** Extra takes recommended per shot. */
  suggestedTakes: number;
  /** Appended to every shot's how-to list. */
  coaching: string | null;
}

export interface StabilizationProfile {
  id: StabilizationId;
  label: string;
  description: string;
  /** Movements this rig can execute cleanly. */
  supports: CameraMovement[];
  /** Fallback when a templated movement is not supported. */
  fallback: CameraMovement;
  note: string;
}
