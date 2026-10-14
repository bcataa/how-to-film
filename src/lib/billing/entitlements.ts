import type { Entitlements, Tier } from "@/lib/types";

/**
 * Capability flags per access level.
 *
 * This module intentionally contains no payment code. A real provider
 * (Stripe, RevenueCat, App Store) would resolve the user's `Tier` and this
 * table would translate it into capabilities. Nothing else in the app knows
 * about billing — features only ask "can I do this?".
 */
export const TIERS: Record<Tier, Entitlements> = {
  free: {
    tier: "free",
    maxSavedProjects: 2,
    monthlyPlanLimit: 3,
    premiumStyles: false,
    aiPlans: false,
    aiVideoFeedback: false,
  },
  pro: {
    tier: "pro",
    maxSavedProjects: Number.POSITIVE_INFINITY,
    monthlyPlanLimit: Number.POSITIVE_INFINITY,
    premiumStyles: true,
    aiPlans: false, // Not built yet. Stays false on every tier until it is real.
    aiVideoFeedback: false,
  },
};

/** Styles behind the Pro tier. Kept here rather than in the style data so the
 *  content library has no knowledge of commercial decisions. */
export const PREMIUM_STYLE_IDS = ["commercial"] as const;

export function entitlementsFor(tier: Tier): Entitlements {
  return TIERS[tier];
}

export type GateReason =
  | { allowed: true }
  | { allowed: false; reason: string; requires: Tier };

export function canSaveProject(
  entitlements: Entitlements,
  currentCount: number,
): GateReason {
  if (currentCount < entitlements.maxSavedProjects) return { allowed: true };
  return {
    allowed: false,
    reason: `Free accounts can keep ${entitlements.maxSavedProjects} saved projects. Delete one, or upgrade for unlimited.`,
    requires: "pro",
  };
}

export function canGeneratePlan(
  entitlements: Entitlements,
  plansThisMonth: number,
): GateReason {
  if (plansThisMonth < entitlements.monthlyPlanLimit) return { allowed: true };
  return {
    allowed: false,
    reason: `You have used all ${entitlements.monthlyPlanLimit} free shooting plans this month.`,
    requires: "pro",
  };
}

export function canUseStyle(entitlements: Entitlements, styleId: string): GateReason {
  const isPremium = (PREMIUM_STYLE_IDS as readonly string[]).includes(styleId);
  if (!isPremium || entitlements.premiumStyles) return { allowed: true };
  return {
    allowed: false,
    reason: "Premium template — available on Pro",
    requires: "pro",
  };
}
