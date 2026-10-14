import { NextResponse } from "next/server";
import { buildTemplatePlan } from "@/lib/plan/engine";
import {
  DEVICE_ORDER,
  EXPERIENCE_ORDER,
  STABILIZATION_ORDER,
  STYLE_ORDER,
  SUBJECT_ORDER,
  getStabilization,
  getStyle,
  getSubject,
} from "@/lib/plan";
import {
  ALL_LESSONS,
  MODULES,
  PATHS,
  getModule,
  modulesForPath,
} from "@/lib/academy/curriculum";
import type { DurationSec, ShootBrief } from "@/lib/types";

const DURATIONS: DurationSec[] = [15, 30, 60];

/**
 * Exhaustive check of the plan generator across every brief combination.
 * Development only — there is no test runner in this project yet, so this
 * route is the regression suite. Visit /api/selftest with `npm run dev`.
 */
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }

  const failures: string[] = [];
  let count = 0;
  let totalShots = 0;

  for (const subject of SUBJECT_ORDER) {
    for (const style of STYLE_ORDER) {
      for (const durationSec of DURATIONS) {
        for (const device of DEVICE_ORDER) {
          for (const experience of EXPERIENCE_ORDER) {
            for (const stabilization of STABILIZATION_ORDER) {
              const brief: ShootBrief = {
                subject,
                customSubject: subject === "custom" ? "A vintage record player" : undefined,
                device,
                style,
                durationSec,
                experience,
                stabilization,
              };

              const plan = buildTemplatePlan(brief);
              count += 1;
              totalShots += plan.shots.length;
              const tag = `${subject}/${style}/${durationSec}s/${device}/${experience}/${stabilization}`;

              // Runtime must land exactly on the requested duration.
              if (plan.totalDurationSec !== durationSec) {
                failures.push(
                  `${tag}: runtime ${plan.totalDurationSec}s != requested ${durationSec}s`,
                );
              }

              const expected = Math.min(
                getStyle(style).shotCount[durationSec],
                getSubject(subject).shots.length,
              );
              if (plan.shots.length !== expected) {
                failures.push(
                  `${tag}: ${plan.shots.length} shots, expected ${expected}`,
                );
              }

              const rig = getStabilization(stabilization);
              const ids = new Set<string>();

              for (const shot of plan.shots) {
                if (shot.durationSec < 1) {
                  failures.push(`${tag}: shot ${shot.slate} is ${shot.durationSec}s`);
                }
                if (!rig.supports.includes(shot.movement)) {
                  failures.push(
                    `${tag}: shot ${shot.slate} uses ${shot.movement}, unsupported on ${stabilization}`,
                  );
                }
                if (ids.has(shot.id)) failures.push(`${tag}: duplicate shot id ${shot.id}`);
                ids.add(shot.id);
                if (shot.howTo.length === 0) failures.push(`${tag}: ${shot.slate} has no steps`);
                if (shot.checklist.length === 0)
                  failures.push(`${tag}: ${shot.slate} has no checklist`);
                if (shot.art.subjectX < 0 || shot.art.subjectX > 1)
                  failures.push(`${tag}: ${shot.slate} subjectX out of range`);
              }

              // Only the final shot may omit a transition.
              const missing = plan.shots.filter((s, i) => !s.transitionOut && i < plan.shots.length - 1);
              if (missing.length > 0) {
                failures.push(`${tag}: ${missing.length} mid-plan shots missing a transition`);
              }
              if (plan.shots.at(-1)?.transitionOut) {
                failures.push(`${tag}: final shot has a transition`);
              }
              if (plan.source.kind !== "template") {
                failures.push(`${tag}: source is not labelled as template`);
              }
              if (plan.prepChecklist.length === 0) failures.push(`${tag}: empty prep checklist`);
              if (plan.editSteps.length === 0) failures.push(`${tag}: empty edit steps`);
            }
          }
        }
      }
    }
  }

  // Determinism: identical briefs must produce identical plans.
  const brief: ShootBrief = {
    subject: "car",
    device: "iphone",
    style: "cinematic",
    durationSec: 30,
    experience: "some-practice",
    stabilization: "gimbal",
  };
  const a = buildTemplatePlan(brief, { now: () => new Date(0) });
  const b = buildTemplatePlan(brief, { now: () => new Date(0) });
  if (JSON.stringify(a) !== JSON.stringify(b)) failures.push("plans are not deterministic");

  const v1 = buildTemplatePlan(brief, { variant: 1, now: () => new Date(0) });
  if (JSON.stringify(a) === JSON.stringify(v1)) {
    failures.push("variant 1 produced an identical plan");
  }

  const lessonIds = new Set<string>();
  const exerciseIds = new Set<string>();
  for (const mod of MODULES) {
    if (!PATHS.some((p) => p.moduleIds.includes(mod.id))) {
      failures.push(`module ${mod.id} is not in any path`);
    }
    if (mod.pathId && !PATHS.some((p) => p.id === mod.pathId)) {
      failures.push(`module ${mod.id} points at missing path ${mod.pathId}`);
    }
    if (mod.lessons.length === 0) failures.push(`module ${mod.id} has no lessons`);
    for (const lesson of mod.lessons) {
      if (lessonIds.has(lesson.id)) failures.push(`duplicate lesson id ${lesson.id}`);
      lessonIds.add(lesson.id);
      if (lesson.sections.length === 0) failures.push(`${lesson.id}: no sections`);
      if (lesson.keyPoints.length === 0) failures.push(`${lesson.id}: no key points`);
      if (lesson.exercise.steps.length === 0) failures.push(`${lesson.id}: empty exercise`);
      if (lesson.exercise.successCriteria.length === 0) {
        failures.push(`${lesson.id}: no success criteria`);
      }
      if (exerciseIds.has(lesson.exercise.id)) {
        failures.push(`duplicate exercise id ${lesson.exercise.id}`);
      }
      exerciseIds.add(lesson.exercise.id);
    }
  }

  for (const path of PATHS) {
    if (path.moduleIds.length === 0) failures.push(`path ${path.id} has no modules`);
    for (const id of path.moduleIds) {
      if (!getModule(id)) failures.push(`path ${path.id} missing module ${id}`);
    }
    const fp = path.finalProject;
    if (fp.requirements.length < 3) {
      failures.push(`path ${path.id}: final project needs at least 3 requirements`);
    }
    if (fp.reviewQuestions.length < 2) {
      failures.push(`path ${path.id}: final project needs review questions`);
    }
    const covered = modulesForPath(path).length;
    if (covered !== path.moduleIds.length) {
      failures.push(`path ${path.id}: ${covered}/${path.moduleIds.length} modules resolve`);
    }
  }

  if (ALL_LESSONS.length !== lessonIds.size) {
    failures.push("ALL_LESSONS is out of sync with module lesson ids");
  }

  return NextResponse.json({
    combinations: count,
    averageShots: Math.round((totalShots / count) * 10) / 10,
    academy: {
      paths: PATHS.length,
      modules: MODULES.length,
      lessons: ALL_LESSONS.length,
      exercises: exerciseIds.size,
    },
    failureCount: failures.length,
    failures: failures.slice(0, 25),
  });
}
