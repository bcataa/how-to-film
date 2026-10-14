"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader, PageShell } from "@/components/ui/PageShell";
import { Progress } from "@/components/ui/Progress";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/States";
import { PlanView } from "@/components/plan/PlanView";
import { useProject, useProjectStore } from "@/lib/store/ProjectStore";
import { shotProgressSummary } from "@/lib/store/project-factory";
import { relativeTime } from "@/lib/format";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { status, error, reload, deleteProject } = useProjectStore();
  const { project } = useProject(id);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (status === "loading") {
    return (
      <PageShell>
        <div className="space-y-3 pt-8">
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-[150px]" />
          <Skeleton className="h-[110px]" />
        </div>
      </PageShell>
    );
  }

  if (status === "error") {
    return (
      <PageShell>
        <PageHeader title="Project" backHref="/projects" backLabel="Projects" />
        <ErrorState
          title="Local storage unavailable"
          description={error ?? "Could not read saved projects on this device."}
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
      </PageShell>
    );
  }

  if (!project) {
    return (
      <PageShell>
        <PageHeader title="Project not found" backHref="/projects" backLabel="Projects" />
        <EmptyState
          title="This project does not exist"
          description="It may have been deleted, or saved in a different browser. Projects are stored on the device that created them."
          action={
            <ButtonLink href="/ready" variant="outline" size="sm">
              Build a new plan
            </ButtonLink>
          }
        />
      </PageShell>
    );
  }

  const { done, total, pct } = shotProgressSummary(project);

  return (
    <PageShell>
      <PageHeader
        eyebrow={`Saved ${relativeTime(project.createdAt)}`}
        title={project.name}
        backHref="/projects"
        backLabel="Projects"
      />

      <Card className="mb-5 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[13px] text-bone-200">
            {done} of {total} shots recorded
          </span>
          <Badge tone={done === total ? "lime" : "neutral"}>{pct}%</Badge>
        </div>
        <Progress value={pct} label="Shots recorded" />
      </Card>

      <div className="mb-6 flex flex-col gap-2.5 sm:flex-row">
        <ButtonLink href={`/project/${project.id}/shoot`} size="lg" fullWidth>
          <Camera className="size-[18px]" aria-hidden />
          {done === 0
            ? "Start guided shooting"
            : done === total
              ? "Review shot list"
              : "Continue shooting"}
        </ButtonLink>

        {confirmDelete ? (
          <Button
            variant="danger"
            size="lg"
            loading={deleting}
            onClick={async () => {
              setDeleting(true);
              await deleteProject(project.id);
              router.push("/projects");
            }}
          >
            <Trash2 className="size-[18px]" aria-hidden />
            Confirm delete
          </Button>
        ) : (
          <Button
            variant="outline"
            size="lg"
            onClick={() => setConfirmDelete(true)}
            aria-label="Delete project"
          >
            <Trash2 className="size-[18px]" aria-hidden />
          </Button>
        )}
      </div>

      <div className="pb-12">
        <PlanView plan={project.plan} />
      </div>
    </PageShell>
  );
}
