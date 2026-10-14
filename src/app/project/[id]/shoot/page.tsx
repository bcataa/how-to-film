"use client";

import { use, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Plus,
  RotateCcw,
  Settings2,
  X,
} from "lucide-react";
import type { Project, ShotProgress } from "@/lib/types";
import { Badge, Meta } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { EmptyState, Skeleton } from "@/components/ui/States";
import { ShotFrame } from "@/components/storyboard/ShotFrame";
import { useProject, useProjectStore } from "@/lib/store/ProjectStore";
import { emptyProgress, shotProgressSummary } from "@/lib/store/project-factory";
import { humanize, secs } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function ShootPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { status, updateProject } = useProjectStore();
  const { project } = useProject(id);

  const [index, setIndex] = useState(0);
  const [initialised, setInitialised] = useState(false);

  // Open on the first shot the user has not finished yet.
  useEffect(() => {
    if (!project || initialised) return;
    const firstUndone = project.plan.shots.findIndex(
      (s) => !project.shotProgress[s.id]?.completed,
    );
    setIndex(firstUndone === -1 ? 0 : firstUndone);
    setInitialised(true);
  }, [project, initialised]);

  const shots = project?.plan.shots ?? [];
  const shot = shots[index];

  const progress: ShotProgress = useMemo(
    () =>
      (shot && project?.shotProgress[shot.id]) ?? emptyProgress(),
    [shot, project],
  );

  const mutateProgress = useCallback(
    async (change: (current: ShotProgress) => ShotProgress) => {
      if (!shot) return;
      await updateProject(id, (current: Project) => ({
        ...current,
        shotProgress: {
          ...current.shotProgress,
          [shot.id]: change(current.shotProgress[shot.id] ?? emptyProgress()),
        },
      }));
    },
    [id, shot, updateProject],
  );

  const toggleItem = useCallback(
    (itemId: string) =>
      void mutateProgress((p) => ({
        ...p,
        checkedItems: p.checkedItems.includes(itemId)
          ? p.checkedItems.filter((x) => x !== itemId)
          : [...p.checkedItems, itemId],
      })),
    [mutateProgress],
  );

  const addTake = useCallback(
    () => void mutateProgress((p) => ({ ...p, takes: p.takes + 1 })),
    [mutateProgress],
  );

  const complete = useCallback(async () => {
    await mutateProgress((p) => ({
      ...p,
      completed: true,
      completedAt: new Date().toISOString(),
      takes: Math.max(1, p.takes),
    }));
    setIndex((i) => Math.min(shots.length - 1, i + 1));
  }, [mutateProgress, shots.length]);

  const reopen = useCallback(
    () =>
      void mutateProgress((p) => ({
        ...p,
        completed: false,
        completedAt: undefined,
      })),
    [mutateProgress],
  );

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-2xl space-y-3 px-4 pt-8">
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="h-[320px]" />
      </div>
    );
  }

  if (!project || !shot) {
    return (
      <div className="mx-auto max-w-2xl px-4 pt-10">
        <EmptyState
          title="Nothing to shoot"
          description="This project could not be loaded on this device."
          action={
            <ButtonLink href="/projects" variant="outline" size="sm">
              Back to projects
            </ButtonLink>
          }
        />
      </div>
    );
  }

  const { done, total, pct } = shotProgressSummary(project);
  const allDone = done === total;

  return (
    <div className="flex min-h-dvh flex-col bg-ink-950">
      {/* ----------------------------------------------------------- Top bar */}
      <header
        className="sticky top-0 z-30 border-b border-bone-50/8 bg-ink-950/92 backdrop-blur-xl"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <Link
            href={`/project/${project.id}`}
            aria-label="Exit guided shooting"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-ink-800 text-bone-300 transition-colors hover:bg-ink-750 hover:text-bone-50"
          >
            <X className="size-[18px]" aria-hidden />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-[13px] font-medium text-bone-200">
                {project.name}
              </p>
              <Meta className="shrink-0">
                {done}/{total}
              </Meta>
            </div>
            <Progress value={pct} className="mt-1.5 h-1" label="Shots recorded" />
          </div>
        </div>

        {/* Shot rail — lets the user jump back to any previous instruction. */}
        <div className="scrollbar-none mx-auto flex max-w-2xl gap-1.5 overflow-x-auto px-4 pb-3">
          {shots.map((s, i) => {
            const isDone = project.shotProgress[s.id]?.completed;
            const active = i === index;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Shot ${s.slate}: ${s.title}`}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-lg font-mono text-[11px] transition-colors duration-200",
                  active
                    ? "bg-lime-400 text-ink-950"
                    : isDone
                      ? "bg-lime-950 text-lime-400"
                      : "bg-ink-800 text-bone-500 hover:bg-ink-750",
                )}
              >
                {isDone && !active ? (
                  <Check className="size-3.5" aria-hidden />
                ) : (
                  s.order
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* ------------------------------------------------------------ Content */}
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pt-5 pb-[calc(7.5rem+env(safe-area-inset-bottom))]">
        <div key={shot.id} className="animate-fade space-y-5">
          <ShotFrame art={shot.art} className="aspect-[4/5] w-full" />

          <div>
            <div className="flex items-center gap-2">
              <Meta className="text-lime-400">Shot {shot.slate}</Meta>
              <Meta>{secs(shot.durationSec)}</Meta>
              {progress.completed ? (
                <Badge tone="lime">
                  <Check className="size-3" aria-hidden />
                  Recorded
                </Badge>
              ) : null}
            </div>

            <h1 className="mt-1.5 text-[22px] leading-tight font-semibold">
              {shot.title}
            </h1>
            <p className="mt-2 text-[13px] leading-relaxed text-bone-400">
              {shot.purpose}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge>{humanize(shot.framing)}</Badge>
              <Badge>{humanize(shot.angle)}</Badge>
              <Badge tone="teal">{humanize(shot.movement)}</Badge>
              <Badge tone="lime">Record {secs(shot.durationSec)}</Badge>
            </div>
          </div>

          {/* Instructions */}
          <Card className="p-4">
            <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-bone-500">
              Do this
            </h2>
            <ol className="space-y-3">
              {shot.howTo.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-[3px] grid size-5 shrink-0 place-items-center rounded-full bg-ink-800 font-mono text-[10px] text-lime-400">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-bone-200">{step}</span>
                </li>
              ))}
            </ol>
          </Card>

          {/* Lighting + warning */}
          <Card className="p-4">
            <div className="flex gap-3">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-400" aria-hidden />
              <p className="text-[13px] leading-relaxed text-bone-200">{shot.lighting}</p>
            </div>
          </Card>

          <Card className="border-amber-400/20 bg-amber-400/[0.05] p-4">
            <div className="flex gap-3">
              <AlertTriangle
                className="mt-0.5 size-4 shrink-0 text-amber-400"
                aria-hidden
              />
              <div>
                <p className="text-[11px] font-medium tracking-wide text-amber-400">
                  Watch out for
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-bone-200">
                  {shot.watchOutFor}
                </p>
              </div>
            </div>
          </Card>

          {/* Checklist */}
          <Card className="p-4">
            <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-bone-500">
              Check before you move on
            </h2>
            <ul className="space-y-1">
              {shot.checklist.map((item) => {
                const checked = progress.checkedItems.includes(item.id);
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-pressed={checked}
                      className="flex w-full items-start gap-3 rounded-field px-1 py-2.5 text-left transition-colors hover:bg-ink-800"
                    >
                      <span
                        className={cn(
                          "mt-[1px] grid size-5 shrink-0 place-items-center rounded-md border transition-colors duration-200",
                          checked
                            ? "border-lime-400 bg-lime-400 text-ink-950"
                            : "border-bone-50/20",
                        )}
                        aria-hidden
                      >
                        {checked ? <Check className="size-3.5" /> : null}
                      </span>
                      <span
                        className={cn(
                          "text-sm leading-relaxed transition-colors",
                          checked ? "text-bone-500 line-through" : "text-bone-200",
                        )}
                      >
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* Takes */}
          <Card className="flex items-center justify-between gap-3 p-4">
            <div>
              <p className="text-[13px] font-medium text-bone-200">Takes recorded</p>
              <p className="mt-0.5 text-[12px] text-bone-500">
                Keep a count so you know what to look for in the edit
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2.5">
              <span className="font-mono text-xl text-bone-50">{progress.takes}</span>
              <Button variant="secondary" size="sm" onClick={addTake}>
                <Plus className="size-4" aria-hidden />
                Take
              </Button>
            </div>
          </Card>

          {/* Settings reminder */}
          <Card className="overflow-hidden">
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center gap-2.5 p-4 text-[13px] text-bone-300 transition-colors hover:bg-ink-800/60">
                <Settings2 className="size-4 text-bone-500" aria-hidden />
                Camera settings for this shot
                <ChevronRight
                  className="ml-auto size-4 text-bone-500 transition-transform duration-300 group-open:rotate-90"
                  aria-hidden
                />
              </summary>
              <dl className="space-y-2.5 border-t border-bone-50/8 px-4 py-4">
                {(
                  [
                    ["Resolution", shot.settings.resolution],
                    ["Frame rate", shot.settings.frameRate],
                    ["Exposure", shot.settings.exposure],
                    ["Focus", shot.settings.focus],
                    ["Lens", shot.settings.lens],
                    ["Audio", shot.settings.audio],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[11px] text-bone-600">{label}</dt>
                    <dd className="mt-0.5 text-[13px] leading-relaxed text-bone-200">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </details>
          </Card>

          {shot.transitionOut ? (
            <Card className="p-4">
              <Meta>Cut into shot {shot.order + 1}</Meta>
              <p className="mt-1.5 text-[13px] font-medium text-bone-50">
                {shot.transitionOut.name}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-bone-400">
                {shot.transitionOut.how}
              </p>
            </Card>
          ) : null}

          {allDone ? (
            <Card className="border-lime-400/25 bg-lime-950/50 p-5 text-center">
              <p className="text-sm font-medium text-lime-400">
                All {total} shots recorded
              </p>
              <p className="mx-auto mt-1.5 max-w-[36ch] text-[13px] leading-relaxed text-bone-300">
                Follow the edit steps in the plan to cut it together. The in-app
                editor is not built yet.
              </p>
              <ButtonLink
                href={`/project/${project.id}`}
                variant="outline"
                size="sm"
                className="mt-4"
              >
                Back to the plan
              </ButtonLink>
            </Card>
          ) : null}
        </div>
      </main>

      {/* ------------------------------------------------------- Action bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t border-bone-50/8 bg-ink-950/95 backdrop-blur-xl"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex max-w-2xl items-center gap-2.5 px-4 py-3">
          <Button
            variant="secondary"
            size="lg"
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            aria-label="Previous shot"
          >
            <ChevronLeft className="size-[18px]" aria-hidden />
          </Button>

          {progress.completed ? (
            <>
              <Button variant="outline" size="lg" fullWidth onClick={reopen}>
                <RotateCcw className="size-[18px]" aria-hidden />
                Reshoot
              </Button>
              <Button
                size="lg"
                disabled={index === shots.length - 1}
                onClick={() => setIndex((i) => Math.min(shots.length - 1, i + 1))}
                aria-label="Next shot"
              >
                <ChevronRight className="size-[18px]" aria-hidden />
              </Button>
            </>
          ) : (
            <Button size="lg" fullWidth onClick={() => void complete()}>
              <Check className="size-[18px]" aria-hidden />
              Mark shot {shot.slate} recorded
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
