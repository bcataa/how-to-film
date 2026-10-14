import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { CardLink } from "@/components/ui/Card";
import { Badge, Meta } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { ShotFrame } from "@/components/storyboard/ShotFrame";
import { shotProgressSummary } from "@/lib/store/project-factory";
import { clock, relativeTime } from "@/lib/format";

const STATUS_LABEL: Record<Project["status"], { label: string; tone: "neutral" | "lime" | "teal" | "amber" }> = {
  planning: { label: "Planning", tone: "neutral" },
  shooting: { label: "Shooting", tone: "lime" },
  editing: { label: "Editing", tone: "teal" },
  complete: { label: "Shot complete", tone: "amber" },
};

export function ProjectCard({ project }: { project: Project }) {
  const { done, total, pct } = shotProgressSummary(project);
  const status = STATUS_LABEL[project.status];
  const firstShot = project.plan.shots[0];

  return (
    <CardLink href={`/project/${project.id}`} className="flex gap-3.5 p-3.5">
      {firstShot ? (
        <ShotFrame
          art={firstShot.art}
          showOverlay={false}
          className="h-[88px] w-[66px] shrink-0"
        />
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-sm font-medium text-bone-50">
              {project.name}
            </h3>
            <ArrowUpRight
              className="size-4 shrink-0 text-bone-600 transition-colors group-hover:text-lime-400"
              aria-hidden
            />
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <Badge tone={status.tone}>{status.label}</Badge>
            <Meta>
              {total} shots · {clock(project.plan.totalDurationSec)}
            </Meta>
          </div>
        </div>

        <div className="mt-3 space-y-1.5">
          <Progress value={pct} label={`${done} of ${total} shots recorded`} />
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-bone-500">
              {done} of {total} shots recorded
            </span>
            <span className="text-[11px] text-bone-600">
              {relativeTime(project.updatedAt)}
            </span>
          </div>
        </div>
      </div>
    </CardLink>
  );
}
