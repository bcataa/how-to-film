"use client";

import { Film, Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader, PageShell } from "@/components/ui/PageShell";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/States";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { useProjectStore } from "@/lib/store/ProjectStore";

export default function ProjectsPage() {
  const { projects, status, error, reload, entitlements } = useProjectStore();

  const limit = entitlements.maxSavedProjects;
  const atLimit = projects.length >= limit;

  return (
    <PageShell>
      <PageHeader
        title="Projects"
        description={
          Number.isFinite(limit)
            ? `${projects.length} of ${limit} saved on this device`
            : `${projects.length} saved on this device`
        }
        action={
          <ButtonLink href="/ready" size="sm" aria-label="New plan">
            <Plus className="size-4" aria-hidden />
            New
          </ButtonLink>
        }
      />

      {status === "loading" ? (
        <div className="space-y-2.5">
          <Skeleton className="h-[112px]" />
          <Skeleton className="h-[112px]" />
          <Skeleton className="h-[112px]" />
        </div>
      ) : status === "error" ? (
        <ErrorState
          title="Local storage unavailable"
          description={`${error ?? "Unknown error."} This app stores projects in the browser, which private browsing blocks.`}
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
      ) : projects.length === 0 ? (
        <EmptyState
          icon={<Film className="size-[18px]" aria-hidden />}
          title="No saved projects"
          description="Build a shooting plan and save it. It stays on this device, so you can open it mid-shoot and tick shots off as you record."
          action={
            <ButtonLink href="/ready" variant="outline" size="sm">
              Build your first plan
            </ButtonLink>
          }
        />
      ) : (
        <>
          <div className="space-y-2.5">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {atLimit ? (
            <p className="mt-5 rounded-field border border-bone-50/8 bg-ink-850 p-4 text-[12px] leading-relaxed text-bone-500">
              You have reached the {limit}-project limit for free accounts.
              Delete a project to save a new one. Pro is not purchasable yet —
              no payment provider is connected.
            </p>
          ) : null}

          <p className="mt-5 pb-8 text-[12px] leading-relaxed text-bone-600">
            Projects are stored in this browser only. Clearing site data or
            switching device will remove them. Cloud sync arrives with accounts.
          </p>
        </>
      )}
    </PageShell>
  );
}
