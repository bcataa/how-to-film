"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clapperboard,
  Film,
  GraduationCap,
  Scissors,
  Target,
  Zap,
} from "lucide-react";
import { Badge, Meta } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardLink, SectionHeader } from "@/components/ui/Card";
import { PageShell } from "@/components/ui/PageShell";
import { Progress, ProgressRing } from "@/components/ui/Progress";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/States";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { challengeForDate } from "@/lib/academy/challenges";
import {
  PATHS,
  academyTotals,
  lessonHref,
  nextLesson,
} from "@/lib/academy/curriculum";
import { useLearningProgress } from "@/lib/academy/useLearningProgress";
import { useProjectStore } from "@/lib/store/ProjectStore";

export default function HomePage() {
  const { projects, status, error, reload, entitlements, plansGenerated } =
    useProjectStore();
  const { completed, loading: learningLoading } = useLearningProgress();

  const challenge = challengeForDate();
  const next = nextLesson(completed);
  const { lessonsDone, lessonsTotal } = academyTotals(completed);
  const recent = projects.slice(0, 3);

  const planLimit = entitlements.monthlyPlanLimit;
  const plansLeft = Number.isFinite(planLimit)
    ? Math.max(0, planLimit - plansGenerated)
    : null;

  return (
    <PageShell>
      <header className="pt-7 pb-6 lg:pt-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-lime-400">
              How to Film
            </p>
            <h1 className="mt-2 text-[28px] leading-[1.15] font-semibold lg:text-[34px]">
              What are you
              <br />
              filming today?
            </h1>
          </div>
          <Link
            href="/academy"
            className="shrink-0 pt-2"
            aria-label={`${lessonsDone} of ${lessonsTotal} lessons complete`}
          >
            <ProgressRing value={lessonsDone} max={lessonsTotal}>
              {lessonsDone}/{lessonsTotal}
            </ProgressRing>
          </Link>
        </div>
      </header>

      {/* ------------------------------------------------------ Ready to Go */}
      <section className="mb-7">
        <Card className="cine-wash relative overflow-hidden p-5">
          <div className="relative">
            <Badge tone="lime" icon={<Zap className="size-3" aria-hidden />}>
              Core workflow
            </Badge>
            <h2 className="mt-3 text-xl leading-snug font-semibold">
              Ready to Go
            </h2>
            <p className="mt-2 max-w-[42ch] text-[13px] leading-relaxed text-bone-400">
              Answer six questions and get a shot-by-shot plan with angles,
              movements, camera settings, lighting and an edit order — built for
              the gear you actually have.
            </p>

            <ButtonLink href="/ready" size="lg" fullWidth className="mt-5">
              <Clapperboard className="size-[18px]" aria-hidden />
              Build a shooting plan
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>

            <p className="mt-3 text-center text-[11px] text-bone-600">
              {plansLeft === null
                ? "Unlimited plans on Pro"
                : `${plansLeft} of ${planLimit} free plans left this month`}
            </p>
          </div>
        </Card>
      </section>

      {/* -------------------------------------------- Continue learning */}
      <section className="mb-7">
        <SectionHeader
          title="Continue learning"
          action={
            <Link
              href="/academy"
              className="text-[13px] text-bone-400 transition-colors hover:text-lime-400"
            >
              All paths
            </Link>
          }
        />

        {learningLoading ? (
          <Skeleton className="h-[108px]" />
        ) : next ? (
          <CardLink href={lessonHref(next.module, next.lesson)} className="p-4">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-teal-950 text-teal-400">
                <GraduationCap className="size-[18px]" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <Meta>
                  {next.path.title} · {next.lesson.minutes} min
                </Meta>
                <h3 className="mt-0.5 truncate text-sm font-medium text-bone-50">
                  {next.lesson.title}
                </h3>
              </div>
              <ArrowRight
                className="size-4 shrink-0 text-bone-600 transition-colors group-hover:text-lime-400"
                aria-hidden
              />
            </div>
            <p className="mt-3 line-clamp-2 text-[13px] leading-relaxed text-bone-400">
              {next.lesson.summary}
            </p>
            <div className="mt-3.5 space-y-1.5">
              <Progress
                value={lessonsDone}
                max={lessonsTotal}
                label="Course progress"
              />
              <p className="text-[11px] text-bone-500">
                {lessonsDone} of {lessonsTotal} lessons across {PATHS.length}{" "}
                paths
              </p>
            </div>
          </CardLink>
        ) : (
          <Card className="p-5 text-center">
            <p className="text-sm font-medium text-lime-400">
              Every lesson complete
            </p>
            <p className="mt-1 text-[13px] text-bone-400">
              All {lessonsTotal} lessons done. Pick a final project on a path,
              or go and shoot something.
            </p>
          </Card>
        )}
      </section>

      {/* ------------------------------------------------ Daily challenge */}
      <section className="mb-7">
        <SectionHeader title="Today's challenge" />
        <Card className="p-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-lime-950 text-lime-400">
              <Target className="size-[18px]" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <Meta>
                {challenge.skill} · {challenge.minutes} min
              </Meta>
              <h3 className="mt-0.5 text-sm font-medium text-bone-50">
                {challenge.title}
              </h3>
            </div>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-bone-400">
            {challenge.brief}
          </p>
        </Card>
      </section>

      {/* -------------------------------------------------- Recent projects */}
      <section className="mb-7">
        <SectionHeader
          title="Recent projects"
          action={
            projects.length > 0 ? (
              <Link
                href="/projects"
                className="text-[13px] text-bone-400 transition-colors hover:text-lime-400"
              >
                View all ({projects.length})
              </Link>
            ) : undefined
          }
        />

        {status === "loading" ? (
          <div className="space-y-2.5">
            <Skeleton className="h-[112px]" />
            <Skeleton className="h-[112px]" />
          </div>
        ) : status === "error" ? (
          <ErrorState
            title="Local storage unavailable"
            description={`${error ?? "Unknown error."} Projects cannot be saved on this device — private browsing blocks the storage this app uses. Everything else still works.`}
            retry={
              <button
                type="button"
                onClick={() => void reload()}
                className="mt-1 text-[13px] font-medium text-rose-400 underline underline-offset-4"
              >
                Try again
              </button>
            }
          />
        ) : recent.length === 0 ? (
          <EmptyState
            icon={<Film className="size-[18px]" aria-hidden />}
            title="No projects yet"
            description="Build your first shooting plan and it will be saved here so you can come back to it mid-shoot."
            action={
              <ButtonLink href="/ready" variant="outline" size="sm">
                Start a plan
              </ButtonLink>
            }
          />
        ) : (
          <div className="space-y-2.5">
            {recent.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* ------------------------------------------------------- Editor link */}
      <section className="mb-10">
        <SectionHeader title="Editor" />
        <CardLink href="/editor" className="flex items-center gap-3 p-4">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink-800 text-bone-300">
            <Scissors className="size-[18px]" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-bone-50">Clip editor</h3>
            <p className="mt-0.5 text-[12px] text-bone-500">
              Trim, reorder and sequence the clips you have recorded
            </p>
          </div>
          <ArrowRight
            className="size-4 shrink-0 text-bone-600 transition-colors group-hover:text-lime-400"
            aria-hidden
          />
        </CardLink>
      </section>
    </PageShell>
  );
}
