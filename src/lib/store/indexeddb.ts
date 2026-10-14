import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { Project } from "@/lib/types";
import type {
  ProjectRepository,
  UsageRecord,
  UsageRepository,
} from "./repository";

const DB_NAME = "how-to-film";
const DB_VERSION = 1;

interface FilmDB extends DBSchema {
  projects: {
    key: string;
    value: Project;
    indexes: { "by-updated": string };
  };
  usage: {
    key: string;
    value: UsageRecord;
  };
  /** Lesson/module completion for the academy milestone. */
  learning: {
    key: string;
    value: { id: string; completedAt: string };
  };
}

let dbPromise: Promise<IDBPDatabase<FilmDB>> | null = null;

function getDb() {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(
      new Error("IndexedDB is not available in this environment."),
    );
  }
  dbPromise ??= openDB<FilmDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("projects")) {
        const store = db.createObjectStore("projects", { keyPath: "id" });
        store.createIndex("by-updated", "updatedAt");
      }
      if (!db.objectStoreNames.contains("usage")) {
        db.createObjectStore("usage", { keyPath: "month" });
      }
      if (!db.objectStoreNames.contains("learning")) {
        db.createObjectStore("learning", { keyPath: "id" });
      }
    },
  });
  return dbPromise;
}

export const indexedDbProjects: ProjectRepository = {
  async list() {
    const db = await getDb();
    const all = await db.getAllFromIndex("projects", "by-updated");
    // Index is ascending; the dashboard wants most-recent first.
    return all.reverse();
  },
  async get(id) {
    const db = await getDb();
    return db.get("projects", id);
  },
  async put(project) {
    const db = await getDb();
    await db.put("projects", project);
  },
  async remove(id) {
    const db = await getDb();
    await db.delete("projects", id);
  },
};

function currentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export const indexedDbUsage: UsageRepository = {
  async current() {
    const db = await getDb();
    const month = currentMonth();
    const existing = await db.get("usage", month);
    return existing ?? { month, plansGenerated: 0 };
  },
  async incrementPlans() {
    const db = await getDb();
    const month = currentMonth();
    const tx = db.transaction("usage", "readwrite");
    const existing = await tx.store.get(month);
    const next: UsageRecord = {
      month,
      plansGenerated: (existing?.plansGenerated ?? 0) + 1,
    };
    await tx.store.put(next);
    await tx.done;
    return next;
  },
};

/* -------------------------------------------------------------------------- */
/* Learning progress                                                          */
/* -------------------------------------------------------------------------- */

export const learningStore = {
  async completedIds(): Promise<string[]> {
    const db = await getDb();
    const rows = await db.getAll("learning");
    return rows.map((r) => r.id);
  },
  async markComplete(id: string): Promise<void> {
    const db = await getDb();
    await db.put("learning", { id, completedAt: new Date().toISOString() });
  },
  async markIncomplete(id: string): Promise<void> {
    const db = await getDb();
    await db.delete("learning", id);
  },
};
