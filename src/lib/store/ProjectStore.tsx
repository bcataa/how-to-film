"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Entitlements, Project, ShootingPlan, Tier } from "@/lib/types";
import { entitlementsFor } from "@/lib/billing/entitlements";
import { indexedDbProjects, indexedDbUsage } from "./indexeddb";
import { createProjectFromPlan, deriveStatus } from "./project-factory";

type Status = "loading" | "ready" | "error";

interface ProjectStoreValue {
  status: Status;
  error: string | null;
  projects: Project[];
  plansGenerated: number;
  entitlements: Entitlements;
  /** Dev-only tier switch so gated states can be reviewed without billing. */
  setTier: (tier: Tier) => void;
  saveProject: (project: Project) => Promise<void>;
  createFromPlan: (plan: ShootingPlan, name?: string) => Promise<Project>;
  updateProject: (
    id: string,
    mutate: (current: Project) => Project,
  ) => Promise<Project | undefined>;
  deleteProject: (id: string) => Promise<void>;
  recordPlanGenerated: () => Promise<void>;
  reload: () => Promise<void>;
}

const ProjectStoreContext = createContext<ProjectStoreValue | null>(null);

const TIER_KEY = "htf.tier";

export function ProjectStoreProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [plansGenerated, setPlansGenerated] = useState(0);
  const [tier, setTierState] = useState<Tier>("free");

  const load = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const [list, usage] = await Promise.all([
        indexedDbProjects.list(),
        indexedDbUsage.current(),
      ]);
      setProjects(list);
      setPlansGenerated(usage.plansGenerated);
      setStatus("ready");
    } catch (e) {
      // Private browsing and some embedded webviews block IndexedDB entirely.
      setError(
        e instanceof Error
          ? e.message
          : "Could not open local storage on this device.",
      );
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void load();
    try {
      const stored = window.localStorage.getItem(TIER_KEY);
      if (stored === "pro" || stored === "free") setTierState(stored);
    } catch {
      // localStorage can throw in locked-down browsers; the default is fine.
    }
  }, [load]);

  const setTier = useCallback((next: Tier) => {
    setTierState(next);
    try {
      window.localStorage.setItem(TIER_KEY, next);
    } catch {
      // Non-fatal: the tier simply will not persist across reloads.
    }
  }, []);

  const saveProject = useCallback(async (project: Project) => {
    const next: Project = {
      ...project,
      status: deriveStatus(project),
      updatedAt: new Date().toISOString(),
    };
    await indexedDbProjects.put(next);
    setProjects((prev) => {
      const without = prev.filter((p) => p.id !== next.id);
      return [next, ...without];
    });
  }, []);

  const createFromPlan = useCallback(
    async (plan: ShootingPlan, name?: string) => {
      const project = createProjectFromPlan(plan, name);
      await indexedDbProjects.put(project);
      setProjects((prev) => [project, ...prev]);
      return project;
    },
    [],
  );

  const updateProject = useCallback(
    async (id: string, mutate: (current: Project) => Project) => {
      const current = await indexedDbProjects.get(id);
      if (!current) return undefined;
      const mutated = mutate(current);
      const next: Project = {
        ...mutated,
        status: deriveStatus(mutated),
        updatedAt: new Date().toISOString(),
      };
      await indexedDbProjects.put(next);
      setProjects((prev) => [next, ...prev.filter((p) => p.id !== id)]);
      return next;
    },
    [],
  );

  const deleteProject = useCallback(async (id: string) => {
    await indexedDbProjects.remove(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const recordPlanGenerated = useCallback(async () => {
    try {
      const usage = await indexedDbUsage.incrementPlans();
      setPlansGenerated(usage.plansGenerated);
    } catch {
      // Quota tracking is best-effort; never block plan generation on it.
    }
  }, []);

  const value = useMemo<ProjectStoreValue>(
    () => ({
      status,
      error,
      projects,
      plansGenerated,
      entitlements: entitlementsFor(tier),
      setTier,
      saveProject,
      createFromPlan,
      updateProject,
      deleteProject,
      recordPlanGenerated,
      reload: load,
    }),
    [
      status,
      error,
      projects,
      plansGenerated,
      tier,
      setTier,
      saveProject,
      createFromPlan,
      updateProject,
      deleteProject,
      recordPlanGenerated,
      load,
    ],
  );

  return (
    <ProjectStoreContext.Provider value={value}>
      {children}
    </ProjectStoreContext.Provider>
  );
}

export function useProjectStore(): ProjectStoreValue {
  const ctx = useContext(ProjectStoreContext);
  if (!ctx) {
    throw new Error("useProjectStore must be used inside ProjectStoreProvider");
  }
  return ctx;
}

/** Single project by id, resolved from the already-loaded list. */
export function useProject(id: string | undefined) {
  const { projects, status } = useProjectStore();
  const project = useMemo(
    () => (id ? projects.find((p) => p.id === id) : undefined),
    [projects, id],
  );
  return { project, loading: status === "loading" };
}
