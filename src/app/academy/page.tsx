"use client";

import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Badge, Meta } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageHeader, PageShell } from "@/components/ui/PageShell";
import { Progress } from "@/components/ui/Progress";
import { Skeleton } from "@/components/ui/States";
import {
  PATHS,
  academyTotals,
  modulesForPath,
  pathProgress,
} from "@/lib/academy/curriculum";
import { useLearningProgress } from "@/lib/academy/useLearningProgress";
import { cn } from "@/lib/cn";

export default function AcademyPage() {
  const { completed, loading } = useLearningProgress();
  const totals = academyTotals(completed);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Academy"
        title="Learn the craft"
        description="Three short paths. Each lesson is one idea, a few minutes of reading, and something to go and film. Every path ends with a final project."
      />

      <Card className="mb-6 p-4">
        {loading ? (
          <Skeleton className="h-9" />
        ) : (
          <>
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-[13px] text-bone-200">
                {totals.lessonsDone} of {totals.lessonsTotal} lessons ·{" "}
                {totals.projectsDone} of {totals.projectsTotal} final projects
              </span>
              <Badge
                tone={
                  totals.lessonsDone === totals.lessonsTotal ? "lime" : "neutral"
                }
              >
                {Math.round((totals.lessonsDone / totals.lessonsTotal) * 100)}%
              </Badge>
            </div>
            <Progress
              value={totals.lessonsDone}
              max={totals.lessonsTotal}
              label="Lesson progress"
            />
          </>
        )}
      </Card>

      <div className="space-y-3 pb-10">
        {PATHS.map((path) => {
          const progress = pathProgress(path, completed);
          const mods = modulesForPath(path);
          const allDone = progress.unitsDone === progress.unitsTotal;

          return (
            <Link
              key={path.id}
              href={`/academy/${path.id}`}
              className="group block rounded-card border border-bone-50/8 bg-ink-850 p-4 transition-colors duration-200 hover:border-bone-50/18 hover:bg-ink-800"
            >
              <div className="flex items-start gap-3.5">
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg font-mono text-[12px] transition-colors",
                    allDone
                      ? "bg-lime-400 text-ink-950"
                      : progress.lessonsDone > 0
                        ? "bg-lime-950 text-lime-400"
                        : "bg-ink-800 text-bone-500",
                  )}
                >
                  {allDone ? <Check className="size-4" aria-hidden /> : path.order}
                </span>

                <div className="min-w-0 flex-1">
                  <Meta>
                    Path {path.order} · {mods.length} modules ·{" "}
                    {progress.lessonsTotal} lessons
                  </Meta>
                  <h2 className="mt-1 text-sm leading-snug font-medium text-bone-50">
                    {path.title}
                  </h2>
                  <p className="mt-1 text-[12px] leading-relaxed text-bone-400">
                    {path.subtitle}
                  </p>
                  <div className="mt-3 space-y-1.5">
                    <Progress
                      value={progress.unitsDone}
                      max={progress.unitsTotal}
                      label={`${path.title} progress`}
                    />
                    <p className="text-[11px] text-bone-500">
                      {progress.lessonsDone}/{progress.lessonsTotal} lessons
                      {progress.projectDone ? " · final project done" : ""}
                    </p>
                  </div>
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
