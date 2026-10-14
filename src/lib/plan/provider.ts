import type { ShootBrief, ShootingPlan } from "@/lib/types";
import { buildTemplatePlan } from "./engine";

/**
 * The seam where an AI provider will eventually plug in.
 *
 * Any future provider must return the same `ShootingPlan` shape, so the UI,
 * the guided shooting mode and the persistence layer need no changes. The only
 * visible difference will be `plan.source.kind`, which the UI uses to label
 * where the plan came from — we never imply AI involvement that is not real.
 */
export interface PlanProvider {
  readonly id: string;
  /** Shown in the UI next to the plan. */
  readonly label: string;
  generate(brief: ShootBrief, options?: { variant?: number }): Promise<ShootingPlan>;
}

/**
 * The only provider that exists today. Runs entirely on-device from the
 * bundled shot library — no network call, no key, no cost.
 */
export const templateProvider: PlanProvider = {
  id: "template",
  label: "Shot library",
  async generate(brief, options) {
    return buildTemplatePlan(brief, { variant: options?.variant ?? 0 });
  },
};

/**
 * Resolves the active provider.
 *
 * When an AI provider is added it will be registered here and selected based
 * on the user's entitlements, with `templateProvider` remaining the fallback
 * for free users and for when the AI call fails.
 */
export function getPlanProvider(): PlanProvider {
  return templateProvider;
}
