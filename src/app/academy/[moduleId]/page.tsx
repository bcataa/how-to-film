"use client";

import { use } from "react";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Badge, Meta } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader, PageShell } from "@/components/ui/PageShell";
import { Progress } from "@/components/ui/Progress";
import { EmptyState } from "@/components/ui/States";
import { FinalProjectCard } from "@/components/academy/FinalProjectCard";
import {
  getModule,
  getPath,
  lessonHref,
  modulesForPath,
  pathProgress,
} from "@/lib/academy/curriculum";
import { useLearningProgress } from "@/lib/academy/useLearningProgress";
import { cn } from "@/lib/cn";

export default function AcademySegmentPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = use(params);
  const path = getPath(moduleId);
  if (path) return <PathPage pathId={path.id} />;
  return <ModulePage moduleId={moduleId} />;
}

function PathPage({ pathId }: { pathId: string }) {
  const path = getPath(pathId)!;
  const { completed, toggle } = useLearningProgress();
  const mods = modulesForPath(path);
  const progress = pathProgress(path, completed);

  return (
    <PageShell>
      <PageHeader
        eyebrow={`Path ${path.order}`}
        title={path.title}
        description={path.description}
        backHref="/academy"
        backLabel="Academy"
      />

      <Card className="mb-5 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[13px] text-bone-200">
            {progress.lessonsDone} of {progress.lessonsTotal} lessons
            {progress.projectDone ? " · final project done" : ""}
          </span>
          <Badge tone={progress.projectDone ? "lime" : "neutral"}>
            {mods.reduce((s, m) => s + m.lessons.reduce((a, l) => a + l.minutes, 0), 0)}{" "}
            min of lessons
          </Badge>
        </div>
        <Progress
          value={progress.unitsDone}
          max={progress.unitsTotal}
          label={`${path.title} progress`}
        />
      </Card>

      <div className="mb-8 space-y-2.5">
        {mods.map((mod) => {
          const done = mod.lessons.filter((l) => completed.has(l.id)).length;
          const allDone = done === mod.lessons.length;
          return (
            <Link
              key={mod.id}
              href={`/academy/${mod.id}`}
              className="group block rounded-card border border-bone-50/8 bg-ink-850 p-4 transition-colors duration-200 hover:border-bone-50/18 hover:bg-ink-800"
            >
              <div className="flex items-start gap-3.5">
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg font-mono text-[12px]",
                    allDone
                      ? "bg-lime-400 text-ink-950"
                      : done > 0
                        ? "bg-lime-950 text-lime-400"
                        : "bg-ink-800 text-bone-500",
                  )}
                >
                  {allDone ? <Check className="size-4" aria-hidden /> : mod.order}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-medium text-bone-50">{mod.title}</h2>
                  <p className="mt-1 text-[12px] leading-relaxed text-bone-400">
                    {mod.subtitle}
                  </p>
                  <Meta className="mt-2 block">
                    {done}/{mod.lessons.length} lessons ·{" "}
                    {mod.lessons.reduce((s, l) => s + l.minutes, 0)} min
                  </Meta>
                </div>
                <ChevronRight
                  className="mt-1 size-4 shrink-0 text-bone-600 transition-colors group-hover:text-lime-400"
                  aria-hidden
                />
              </div>
            </Link>
          );
        })}
      </div>

      <section className="pb-10">
        <h2 className="mb-3 px-1 text-[15px] font-semibold text-bone-50">
          Final project
        </h2>
        <FinalProjectCard
          project={path.finalProject}
          completed={completed}
          onToggle={(id) => void toggle(id)}
        />
      </section>
    </PageShell>
  );
}

function ModulePage({ moduleId }: { moduleId: string }) {
  const { completed } = useLearningProgress();
  const mod = getModule(moduleId);
  const path = mod ? getPath(mod.pathId) : undefined;

  if (!mod) {
    return (
      <PageShell>
        <PageHeader title="Not found" backHref="/academy" backLabel="Academy" />
        <EmptyState
          title="No such module"
          description="That path or module is not in the academy."
          action={
            <ButtonLink href="/academy" variant="outline" size="sm">
              All paths
            </ButtonLink>
          }
        />
      </PageShell>
    );
  }

  const doneCount = mod.lessons.filter((l) => completed.has(l.id)).length;

  return (
    <PageShell>
      <PageHeader
        eyebrow={`Module ${mod.order}${path ? ` · ${path.title}` : ""}`}
        title={mod.title}
        description={mod.subtitle}
        backHref={path ? `/academy/${path.id}` : "/academy"}
        backLabel={path ? path.title : "Academy"}
      />

      <Card className="mb-5 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[13px] text-bone-200">
            {doneCount} of {mod.lessons.length} lessons complete
          </span>
          <Badge tone={doneCount === mod.lessons.length ? "lime" : "neutral"}>
            {mod.lessons.reduce((s, l) => s + l.minutes, 0)} min
          </Badge>
        </div>
        <Progress value={doneCount} max={mod.lessons.length} label="Module progress" />
      </Card>

      <div className="space-y-2.5 pb-10">
        {mod.lessons.map((lesson, i) => {
          const done = completed.has(lesson.id);
          const practised = completed.has(lesson.exercise.id);
          return (
            <Link
              key={lesson.id}
              href={lessonHref(mod, lesson)}
              className="group block rounded-card border border-bone-50/8 bg-ink-850 p-4 transition-colors duration-200 hover:border-bone-50/18 hover:bg-ink-800"
            >
              <div className="flex items-start gap-3.5">
                <span
                  className={cn(
                    "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full font-mono text-[11px]",
                    done ? "bg-lime-400 text-ink-950" : "bg-ink-800 text-bone-500",
                  )}
                  aria-hidden
                >
                  {done ? <Check className="size-3.5" /> : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <Meta>
                    {lesson.minutes} min
                    {practised ? " · practised" : ""}
                  </Meta>
                  <h2
                    className={cn(
                      "mt-0.5 text-sm leading-snug font-medium",
                      done ? "text-bone-400" : "text-bone-50",
                    )}
                  >
                    {lesson.title}
                  </h2>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-bone-400">
                    {lesson.summary}
                  </p>
                </div>
                <ChevronRight
                  className="mt-1 size-4 shrink-0 text-bone-600 transition-colors group-hover:text-lime-400"
                  aria-hidden
                />
              </div>
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
}
