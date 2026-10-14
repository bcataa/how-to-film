"use client";

import { useCallback, useEffect, useState } from "react";
import { learningStore } from "@/lib/store/indexeddb";

/**
 * Completion for lessons, exercises and final-project requirements.
 * All of them are stored as ids in the same IndexedDB table — the prefix
 * (`m1-l1`, `m1-l1:ex`, `fp-craft:req:0`) is what distinguishes them.
 */
export function useLearningProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    learningStore
      .completedIds()
      .then((ids) => {
        if (!cancelled) setCompleted(new Set(ids));
      })
      .catch(() => {
        // Storage unavailable — the academy stays readable, just not tracked.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setDone = useCallback(async (id: string, done: boolean) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (done) next.add(id);
      else next.delete(id);
      return next;
    });
    try {
      if (done) await learningStore.markComplete(id);
      else await learningStore.markIncomplete(id);
    } catch {
      // Keep the optimistic UI; the next reload will reflect reality.
    }
  }, []);

  const toggle = useCallback(
    async (id: string) => {
      let nextDone = false;
      setCompleted((prev) => {
        nextDone = !prev.has(id);
        const next = new Set(prev);
        if (nextDone) next.add(id);
        else next.delete(id);
        return next;
      });
      try {
        if (nextDone) await learningStore.markComplete(id);
        else await learningStore.markIncomplete(id);
      } catch {
        // Optimistic UI stands until the next reload.
      }
    },
    [],
  );

  return { completed, loading, toggle, setDone };
}
