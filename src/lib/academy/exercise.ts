import type { Exercise } from "./types";

export function exercise(
  lessonId: string,
  title: string,
  minutes: number,
  steps: string[],
  successCriteria: string[],
): Exercise {
  return { id: `${lessonId}:ex`, title, minutes, steps, successCriteria };
}
