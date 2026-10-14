import type { Project, ShootingPlan, ShotProgress } from "@/lib/types";

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function emptyProgress(): ShotProgress {
  return { completed: false, checkedItems: [], takes: 0 };
}

export function createProjectFromPlan(plan: ShootingPlan, name?: string): Project {
  const now = new Date().toISOString();
  const shotProgress: Record<string, ShotProgress> = {};
  for (const shot of plan.shots) {
    shotProgress[shot.id] = emptyProgress();
  }

  return {
    id: randomId(),
    name: name?.trim() || plan.title,
    createdAt: now,
    updatedAt: now,
    status: "planning",
    brief: plan.brief,
    plan,
    shotProgress,
    mediaRefs: [],
    editorState: null,
  };
}

/** Completed-shot count and total, used by progress indicators everywhere. */
export function shotProgressSummary(project: Project): {
  done: number;
  total: number;
  pct: number;
} {
  const total = project.plan.shots.length;
  const done = project.plan.shots.filter(
    (s) => project.shotProgress[s.id]?.completed,
  ).length;
  return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

/**
 * Derives status from progress rather than storing it independently, so it can
 * never disagree with the underlying shot data.
 */
export function deriveStatus(project: Project): Project["status"] {
  const { done, total } = shotProgressSummary(project);
  if (done === 0) return "planning";
  if (done < total) return "shooting";
  if (project.mediaRefs.length > 0 || project.editorState) return "editing";
  return "complete";
}
