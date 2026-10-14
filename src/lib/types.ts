/**
 * Core domain model for How to Film.
 *
 * These types are the contract between the plan generation service, the
 * persistence layer, and the UI. A future AI provider must return the exact
 * same `ShootingPlan` shape as the template provider, so swapping the source
 * requires no UI changes.
 */

/* -------------------------------------------------------------------------- */
/* Brief — what the user tells us in the Ready to Go form                     */
/* -------------------------------------------------------------------------- */

export type SubjectId =
  | "car"
  | "product"
  | "person"
  | "fashion"
  | "food"
  | "travel"
  | "custom";

export type DeviceId = "iphone" | "android" | "camera";

export type StyleId = "cinematic" | "social" | "commercial" | "travel";

export type DurationSec = 15 | 30 | 60;

export type ExperienceId = "first-time" | "some-practice" | "confident";

export type StabilizationId = "handheld" | "tripod" | "gimbal";

export interface ShootBrief {
  subject: SubjectId;
  /** Free-text subject, only meaningful when `subject === "custom"`. */
  customSubject?: string;
  device: DeviceId;
  style: StyleId;
  durationSec: DurationSec;
  experience: ExperienceId;
  stabilization: StabilizationId;
}

/* -------------------------------------------------------------------------- */
/* Shot vocabulary                                                            */
/* -------------------------------------------------------------------------- */

export type CameraAngle =
  | "eye-level"
  | "low-angle"
  | "high-angle"
  | "ground-level"
  | "overhead"
  | "dutch"
  | "over-the-shoulder";

export type CameraMovement =
  | "static"
  | "pan"
  | "tilt"
  | "push-in"
  | "pull-out"
  | "orbit"
  | "tracking"
  | "reveal"
  | "handheld-drift"
  | "whip";

export type FramingSize =
  | "extreme-wide"
  | "wide"
  | "medium"
  | "close-up"
  | "extreme-close-up";

/** Difficulty is used to gate shots by stated experience level. */
export type ShotDifficulty = 1 | 2 | 3;

/* -------------------------------------------------------------------------- */
/* Illustration descriptor                                                    */
/* -------------------------------------------------------------------------- */

export type SilhouetteId =
  | "car"
  | "bottle"
  | "person-full"
  | "person-bust"
  | "garment"
  | "plate"
  | "landscape"
  | "object";

/**
 * Describes an original, generated storyboard frame. We render this as an SVG
 * rather than shipping photographic references, which keeps the app free of
 * third-party image licensing entirely.
 */
export interface ShotFrameArt {
  silhouette: SilhouetteId;
  framing: FramingSize;
  angle: CameraAngle;
  movement: CameraMovement;
  /** Show rule-of-thirds overlay on the frame. */
  thirds: boolean;
  /** Horizontal placement of the subject in frame, 0 = left, 1 = right. */
  subjectX: number;
}

/* -------------------------------------------------------------------------- */
/* Recording settings                                                         */
/* -------------------------------------------------------------------------- */

export interface RecordingSettings {
  resolution: string;
  frameRate: string;
  aspectRatio: string;
  /** Where to find these controls on the user's specific device. */
  deviceHint: string;
  exposure: string;
  focus: string;
  whiteBalance: string;
  lens: string;
  audio: string;
}

/* -------------------------------------------------------------------------- */
/* Shot                                                                       */
/* -------------------------------------------------------------------------- */

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface Shot {
  id: string;
  /** 1-based position in the edited sequence. */
  order: number;
  /** Short slate code, e.g. "1A". Shown in mono type. */
  slate: string;
  title: string;
  /** Why this shot exists in the edit — the storytelling job it does. */
  purpose: string;
  durationSec: number;
  framing: FramingSize;
  angle: CameraAngle;
  movement: CameraMovement;
  /** Ordered, concrete instructions for executing the shot. */
  howTo: string[];
  lighting: string;
  settings: RecordingSettings;
  /** How this shot cuts into the next one. Absent on the final shot. */
  transitionOut?: TransitionSuggestion;
  checklist: ChecklistItem[];
  art: ShotFrameArt;
  difficulty: ShotDifficulty;
  /** Common beginner mistake to avoid on this shot. */
  watchOutFor: string;
}

export interface TransitionSuggestion {
  name: string;
  /** How to actually achieve it, in-camera or in the edit. */
  how: string;
  /** "in-camera" transitions must be shot deliberately, so we surface them. */
  kind: "cut" | "in-camera" | "edit";
}

/* -------------------------------------------------------------------------- */
/* Plan                                                                       */
/* -------------------------------------------------------------------------- */

export interface EditStep {
  id: string;
  title: string;
  detail: string;
}

export interface ExportRecipe {
  platform: string;
  resolution: string;
  frameRate: string;
  aspectRatio: string;
  notes: string[];
}

export interface AudioPlan {
  musicBrief: string;
  bpmRange: string;
  /** Where to find legally usable music. We never bundle licensed tracks. */
  sourcingNote: string;
  soundDesign: string[];
}

/**
 * Records where a plan came from. The UI reads this to label the plan
 * honestly — we never imply AI involvement when `kind` is "template".
 */
export type PlanSource =
  | { kind: "template"; templateId: string; generatedAt: string }
  | { kind: "ai"; provider: string; model: string; generatedAt: string };

export interface ShootingPlan {
  id: string;
  brief: ShootBrief;
  title: string;
  /** One-sentence creative framing of the finished video. */
  logline: string;
  totalDurationSec: number;
  shots: Shot[];
  lightingPlan: string[];
  audio: AudioPlan;
  editSteps: EditStep[];
  exportRecipe: ExportRecipe;
  gearNotes: string[];
  /** Pre-shoot preparation, done before recording the first frame. */
  prepChecklist: ChecklistItem[];
  source: PlanSource;
}

/* -------------------------------------------------------------------------- */
/* Project — a saved, stateful instance of a plan                             */
/* -------------------------------------------------------------------------- */

export interface ShotProgress {
  completed: boolean;
  completedAt?: string;
  /** Ids of ticked checklist items for this shot. */
  checkedItems: string[];
  takes: number;
  note?: string;
}

/**
 * Reference to a user-selected local file. Browsers cannot persist a usable
 * path, so for now we store metadata only and re-link the file on import.
 * A Supabase Storage upload would populate `remoteUrl`.
 */
export interface MediaRef {
  id: string;
  shotId?: string;
  fileName: string;
  sizeBytes: number;
  mimeType: string;
  durationSec?: number;
  addedAt: string;
  remoteUrl?: string;
}

export type ProjectStatus = "planning" | "shooting" | "editing" | "complete";

export interface Project {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: ProjectStatus;
  brief: ShootBrief;
  plan: ShootingPlan;
  /** Keyed by `Shot.id`. */
  shotProgress: Record<string, ShotProgress>;
  mediaRefs: MediaRef[];
  /** Populated in the editor milestone. */
  editorState: unknown | null;
}

/* -------------------------------------------------------------------------- */
/* Access tiers                                                               */
/* -------------------------------------------------------------------------- */

export type Tier = "free" | "pro";

export interface Entitlements {
  tier: Tier;
  maxSavedProjects: number;
  /** Rolling monthly cap on generated plans. `Infinity` for unlimited. */
  monthlyPlanLimit: number;
  premiumStyles: boolean;
  aiPlans: boolean;
  aiVideoFeedback: boolean;
}
