"use client";

import { Clapperboard, ListChecks } from "lucide-react";
import type { FinalProject } from "@/lib/academy/types";
import { requirementId } from "@/lib/academy/curriculum";
import { readyHref } from "@/lib/academy/brief-query";
import { Badge, Meta } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckRow } from "./CheckRow";

export function FinalProjectCard({
  project,
  completed,
  onToggle,
}: {
  project: FinalProject;
  completed: Set<string>;
  onToggle: (id: string) => void;
}) {
  const done = project.requirements.filter((_, i) =>
    completed.has(requirementId(project.id, i)),
  ).length;
  const allDone = done === project.requirements.length;

  return (
    <Card className="overflow-hidden">
      <div className="cine-wash p-4">
        <div className="flex items-center gap-2">
          <Badge tone={allDone ? "lime" : "neutral"}>Final project</Badge>
          <Meta>{project.minutes} min</Meta>
        </div>
        <h3 className="mt-2.5 text-[15px] font-semibold text-bone-50">{project.title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-bone-400">{project.brief}</p>

        <ButtonLink
          href={readyHref(project.suggestedBrief)}
          size="sm"
          className="mt-4"
        >
          <Clapperboard className="size-4" aria-hidden />
          Open a matching shooting plan
        </ButtonLink>
      </div>

      <div className="border-t border-bone-50/8 p-4">
        <h4 className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-bone-500">
          <ListChecks className="size-3.5" aria-hidden />
          Requirements · {done}/{project.requirements.length}
        </h4>
        <ul>
          {project.requirements.map((label, i) => {
            const id = requirementId(project.id, i);
            return (
              <li key={id}>
                <CheckRow
                  label={label}
                  checked={completed.has(id)}
                  onToggle={() => onToggle(id)}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-bone-50/8 p-4">
        <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-bone-500">
          Watch it back and ask
        </h4>
        <ol className="space-y-2.5">
          {project.reviewQuestions.map((q, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="mt-[2px] font-mono text-[10px] text-bone-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[13px] leading-relaxed text-bone-200">{q}</span>
            </li>
          ))}
        </ol>
      </div>
    </Card>
  );
}
