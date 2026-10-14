import { m1Camera } from "./modules/m1-camera";
import { m2Composition } from "./modules/m2-composition";
import { m3Movement } from "./modules/m3-movement";
import { m4Lighting } from "./modules/m4-lighting";
import { m5Cinematic } from "./modules/m5-cinematic";
import { m6Editing } from "./modules/m6-editing";
import { m7Music } from "./modules/m7-music";
import { m8Export } from "./modules/m8-export";
import { PATHS } from "./paths";
import type { FinalProject, Lesson, Module, Path } from "./types";

export type { Exercise, FinalProject, Lesson, LessonSection, Module, Path } from "./types";

export const MODULES: Module[] = [
  m1Camera,
  m2Composition,
  m3Movement,
  m4Lighting,
  m5Cinematic,
  m6Editing,
  m7Music,
  m8Export,
];

export { PATHS };

export const ALL_LESSONS: Lesson[] = MODULES.flatMap((m) => m.lessons);

export const TOTAL_LESSONS = ALL_LESSONS.length;

export const TOTAL_EXERCISES = ALL_LESSONS.length;

export function getModule(id: string): Module | undefined {
  return MODULES.find((m) => m.id === id);
}

export function getLesson(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getPath(id: string): Path | undefined {
  return PATHS.find((p) => p.id === id);
}

export function findModuleForLesson(lessonId: string): Module | undefined {
  return MODULES.find((m) => m.lessons.some((l) => l.id === lessonId));
}

export function findPathForModule(moduleId: string): Path | undefined {
  return PATHS.find((p) => p.moduleIds.includes(moduleId));
}

export function modulesForPath(path: Path): Module[] {
  return path.moduleIds
    .map((id) => getModule(id))
    .filter((m): m is Module => m !== undefined);
}

export function lessonHref(mod: Module, lesson: Lesson): string {
  return `/academy/${mod.id}/${lesson.id}`;
}

export function nextLesson(
  completed: Set<string>,
): { path: Path; module: Module; lesson: Lesson } | null {
  for (const path of PATHS) {
    for (const mod of modulesForPath(path)) {
      for (const lesson of mod.lessons) {
        if (!completed.has(lesson.id)) return { path, module: mod, lesson };
      }
    }
  }
  return null;
}

/** Next unfinished item inside a path: a lesson, or the final project. */
export function nextInPath(
  path: Path,
  completed: Set<string>,
):
  | { kind: "lesson"; module: Module; lesson: Lesson }
  | { kind: "project"; project: FinalProject }
  | { kind: "done" } {
  for (const mod of modulesForPath(path)) {
    for (const lesson of mod.lessons) {
      if (!completed.has(lesson.id)) return { kind: "lesson", module: mod, lesson };
    }
  }
  if (!isFinalProjectComplete(path.finalProject, completed)) {
    return { kind: "project", project: path.finalProject };
  }
  return { kind: "done" };
}

export function requirementId(projectId: string, index: number): string {
  return `${projectId}:req:${index}`;
}

export function isFinalProjectComplete(
  project: FinalProject,
  completed: Set<string>,
): boolean {
  return project.requirements.every((_, i) => completed.has(requirementId(project.id, i)));
}

export function pathProgress(path: Path, completed: Set<string>) {
  const mods = modulesForPath(path);
  const lessons = mods.flatMap((m) => m.lessons);
  const lessonsDone = lessons.filter((l) => completed.has(l.id)).length;
  const exercisesDone = lessons.filter((l) => completed.has(l.exercise.id)).length;
  const reqs = path.finalProject.requirements.length;
  const reqsDone = path.finalProject.requirements.filter((_, i) =>
    completed.has(requirementId(path.finalProject.id, i)),
  ).length;
  const projectDone = reqsDone === reqs;
  return {
    lessonsDone,
    lessonsTotal: lessons.length,
    exercisesDone,
    exercisesTotal: lessons.length,
    reqsDone,
    reqsTotal: reqs,
    projectDone,
    /** Lessons + final project as one bar. */
    unitsDone: lessonsDone + (projectDone ? 1 : 0),
    unitsTotal: lessons.length + 1,
  };
}

export function academyTotals(completed: Set<string>) {
  const lessonsDone = ALL_LESSONS.filter((l) => completed.has(l.id)).length;
  const exercisesDone = ALL_LESSONS.filter((l) => completed.has(l.exercise.id)).length;
  const projectsDone = PATHS.filter((p) =>
    isFinalProjectComplete(p.finalProject, completed),
  ).length;
  return {
    lessonsDone,
    lessonsTotal: TOTAL_LESSONS,
    exercisesDone,
    exercisesTotal: TOTAL_EXERCISES,
    projectsDone,
    projectsTotal: PATHS.length,
  };
}
