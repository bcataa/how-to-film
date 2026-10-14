"use client";

import { use } from "react";
import { AlertTriangle, ArrowRight, Check, Dumbbell } from "lucide-react";
import { Badge, Meta } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader, PageShell } from "@/components/ui/PageShell";
import { EmptyState } from "@/components/ui/States";
import { ShotFrame } from "@/components/storyboard/ShotFrame";
import { CheckRow } from "@/components/academy/CheckRow";
import {
  getModule,
  lessonHref,
} from "@/lib/academy/curriculum";
import { useLearningProgress } from "@/lib/academy/useLearningProgress";

export default function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = use(params);
  const { completed, setDone } = useLearningProgress();

  const mod = getModule(moduleId);
  const lesson = mod?.lessons.find((l) => l.id === lessonId);
  const index = mod?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  const prev = index > 0 ? mod?.lessons[index - 1] : undefined;
  const next = index >= 0 ? mod?.lessons[index + 1] : undefined;

  if (!mod || !lesson) {
    return (
      <PageShell>
        <PageHeader title="Lesson not found" backHref="/academy" backLabel="Academy" />
        <EmptyState
          title="That lesson is not in this module"
          action={
            <ButtonLink href="/academy" variant="outline" size="sm">
              Academy
            </ButtonLink>
          }
        />
      </PageShell>
    );
  }

  const done = completed.has(lesson.id);
  const practised = completed.has(lesson.exercise.id);

  return (
    <PageShell>
      <PageHeader
        eyebrow={`Module ${mod.order} · Lesson ${index + 1}`}
        title={lesson.title}
        description={lesson.summary}
        backHref={`/academy/${mod.id}`}
        backLabel={mod.title}
        action={
          done ? (
            <Badge tone="lime">
              <Check className="size-3" aria-hidden />
              Done
            </Badge>
          ) : (
            <Meta>{lesson.minutes} min</Meta>
          )
        }
      />

      {lesson.demo ? (
        <ShotFrame art={lesson.demo} className="mb-6 aspect-[4/3] w-full" />
      ) : null}

      <div className="space-y-8 pb-6">
        {lesson.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-[17px] font-semibold text-bone-50">{section.heading}</h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((p) => (
                <p key={p} className="text-[14px] leading-[1.65] text-bone-200">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Card className="mb-5 p-4">
        <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-bone-500">
          Takeaways
        </h2>
        <ul className="space-y-3">
          {lesson.keyPoints.map((point) => (
            <li key={point} className="flex gap-2.5">
              <span
                className="mt-[7px] size-1.5 shrink-0 rounded-full bg-lime-400"
                aria-hidden
              />
              <span className="text-[13px] leading-relaxed text-bone-200">{point}</span>
            </li>
          ))}
        </ul>
      </Card>

      {lesson.mistake ? (
        <Card className="mb-5 border-amber-400/20 bg-amber-400/[0.05] p-4">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-400" aria-hidden />
            <div>
              <p className="text-[11px] font-medium tracking-wide text-amber-400">
                The usual mistake
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-bone-200">
                {lesson.mistake}
              </p>
            </div>
          </div>
        </Card>
      ) : null}

      <Card className="mb-5 overflow-hidden">
        <div className="border-b border-teal-400/15 bg-teal-950/40 p-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="size-3.5 text-teal-400" aria-hidden />
            <Meta className="text-teal-400">
              Exercise · {lesson.exercise.minutes} min
            </Meta>
            {practised ? (
              <Badge tone="teal">Practised</Badge>
            ) : null}
          </div>
          <h2 className="mt-2 text-sm font-medium text-bone-50">
            {lesson.exercise.title}
          </h2>
        </div>

        <div className="space-y-4 p-4">
          <ol className="space-y-3">
            {lesson.exercise.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-[3px] grid size-5 shrink-0 place-items-center rounded-full bg-ink-800 font-mono text-[10px] text-teal-400">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-bone-200">{step}</span>
              </li>
            ))}
          </ol>

          <div>
            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-bone-500">
              You got it if
            </p>
            <ul className="space-y-2">
              {lesson.exercise.successCriteria.map((c) => (
                <li key={c} className="flex gap-2.5">
                  <span
                    className="mt-[7px] size-1.5 shrink-0 rounded-full bg-teal-400"
                    aria-hidden
                  />
                  <span className="text-[13px] leading-relaxed text-bone-200">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <CheckRow
            label="I filmed this and it matched the criteria"
            checked={practised}
            onToggle={() => void setDone(lesson.exercise.id, !practised)}
          />
        </div>
      </Card>

      <Button
        variant={done ? "outline" : "primary"}
        fullWidth
        size="lg"
        onClick={() => void setDone(lesson.id, !done)}
      >
        {done ? "Mark lesson as not done" : "Mark lesson complete"}
      </Button>

      <div className="mt-6 mb-10 flex gap-2.5">
        {prev ? (
          <ButtonLink
            href={lessonHref(mod, prev)}
            variant="secondary"
            className="flex-1"
          >
            Previous
          </ButtonLink>
        ) : (
          <ButtonLink href={`/academy/${mod.id}`} variant="secondary" className="flex-1">
            Module
          </ButtonLink>
        )}
        {next ? (
          <ButtonLink href={lessonHref(mod, next)} className="flex-1">
            Next lesson
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        ) : (
          <ButtonLink href={`/academy/${mod.pathId}`} className="flex-1">
            Path and final project
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        )}
      </div>
    </PageShell>
  );
}
