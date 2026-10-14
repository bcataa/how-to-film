import type { ShootBrief, ShotFrameArt } from "@/lib/types";

/**
 * Academy content model.
 *
 * Shape: Path → Module → Lesson → Exercise, with one FinalProject per path.
 * All content is original and lives in TypeScript for now; moving it to a CMS
 * later only means replacing the loader in `@/lib/academy`, not these types.
 */

/** A headed chunk of lesson prose. Lessons are short, so 2–3 of these. */
export interface LessonSection {
  heading: string;
  paragraphs: string[];
}

/**
 * A practical task. Tracked separately from lesson completion so a user can
 * read a lesson without being marked as having practised it.
 */
export interface Exercise {
  /** Derived id, `${lesson.id}:ex`. Set by the content author. */
  id: string;
  title: string;
  minutes: number;
  steps: string[];
  /** How the user knows they got it right. */
  successCriteria: string[];
}

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  /** One-sentence answer to "what will I know after this?" */
  summary: string;
  sections: LessonSection[];
  /** The short recap, shown as a sticky takeaway block. */
  keyPoints: string[];
  exercise: Exercise;
  /**
   * Optional storyboard frame illustrating the lesson. Reuses the generated
   * SVG art from the shot planner, so lessons need no stock imagery.
   */
  demo?: ShotFrameArt;
  /** Common beginner error this lesson exists to prevent. */
  mistake?: string;
}

export interface Module {
  id: string;
  /** Global 1-based order across the whole academy. */
  order: number;
  pathId: string;
  title: string;
  subtitle: string;
  lessons: Lesson[];
}

/**
 * The capstone for a path. `suggestedBrief` pre-fills the Ready to Go form so
 * the final project flows straight into a real shooting plan.
 */
export interface FinalProject {
  id: string;
  title: string;
  brief: string;
  /** Hard requirements, tracked as a checklist. */
  requirements: string[];
  /** Questions the user answers themselves after watching it back. */
  reviewQuestions: string[];
  suggestedBrief: Partial<ShootBrief>;
  minutes: number;
}

export interface Path {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  /** Why this path exists and what the user can do at the end of it. */
  description: string;
  moduleIds: string[];
  finalProject: FinalProject;
}
