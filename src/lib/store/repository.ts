import type { Project } from "@/lib/types";

/**
 * Storage contract for projects.
 *
 * `IndexedDbProjectRepository` is the only implementation today. A
 * `SupabaseProjectRepository` would implement this same interface and the app
 * would switch between them based on whether the user is signed in — no UI
 * changes required.
 */
export interface ProjectRepository {
  list(): Promise<Project[]>;
  get(id: string): Promise<Project | undefined>;
  put(project: Project): Promise<void>;
  remove(id: string): Promise<void>;
}

/** Usage counters that gating reads. Kept separate from projects so a plan
 *  generated and discarded still counts against a quota. */
export interface UsageRecord {
  /** `YYYY-MM`, so the counter rolls over naturally each month. */
  month: string;
  plansGenerated: number;
}

export interface UsageRepository {
  current(): Promise<UsageRecord>;
  incrementPlans(): Promise<UsageRecord>;
}
