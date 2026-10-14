"use client";

import { Suspense, useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Car,
  Check,
  Hand,
  Loader2,
  Package,
  Palmtree,
  Save,
  Shirt,
  Smartphone,
  Sparkles,
  UtensilsCrossed,
  User,
  Video,
} from "lucide-react";
import type {
  DeviceId,
  DurationSec,
  ExperienceId,
  ShootBrief,
  ShootingPlan,
  StabilizationId,
  StyleId,
  SubjectId,
} from "@/lib/types";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { OptionCard, Segmented } from "@/components/ui/OptionCard";
import { PageHeader, PageShell } from "@/components/ui/PageShell";
import { ErrorState } from "@/components/ui/States";
import { Badge } from "@/components/ui/Badge";
import { PlanView } from "@/components/plan/PlanView";
import {
  DEVICE_ORDER,
  EXPERIENCE,
  EXPERIENCE_ORDER,
  STABILIZATION,
  STABILIZATION_ORDER,
  STYLES,
  STYLE_ORDER,
  SUBJECTS,
  SUBJECT_ORDER,
  getPlanProvider,
} from "@/lib/plan";
import { parseBriefQuery } from "@/lib/academy/brief-query";
import { canGeneratePlan, canUseStyle } from "@/lib/billing/entitlements";
import { useProjectStore } from "@/lib/store/ProjectStore";

const SUBJECT_ICONS: Record<SubjectId, React.ReactNode> = {
  car: <Car className="size-[18px]" aria-hidden />,
  product: <Package className="size-[18px]" aria-hidden />,
  person: <User className="size-[18px]" aria-hidden />,
  fashion: <Shirt className="size-[18px]" aria-hidden />,
  food: <UtensilsCrossed className="size-[18px]" aria-hidden />,
  travel: <Palmtree className="size-[18px]" aria-hidden />,
  custom: <Sparkles className="size-[18px]" aria-hidden />,
};

const DEVICE_ICONS: Record<DeviceId, React.ReactNode> = {
  iphone: <Smartphone className="size-[18px]" aria-hidden />,
  android: <Smartphone className="size-[18px]" aria-hidden />,
  camera: <Camera className="size-[18px]" aria-hidden />,
};

const STABILIZATION_ICONS: Record<StabilizationId, React.ReactNode> = {
  handheld: <Hand className="size-[18px]" aria-hidden />,
  tripod: <Video className="size-[18px]" aria-hidden />,
  gimbal: <Video className="size-[18px]" aria-hidden />,
};

type Draft = {
  subject: SubjectId | null;
  customSubject: string;
  device: DeviceId | null;
  style: StyleId | null;
  durationSec: DurationSec;
  experience: ExperienceId | null;
  stabilization: StabilizationId | null;
};

const STEPS = [
  { id: "subject", label: "Subject" },
  { id: "device", label: "Device" },
  { id: "style", label: "Style" },
  { id: "duration", label: "Length" },
  { id: "experience", label: "Experience" },
  { id: "rig", label: "Rig" },
] as const;

export default function ReadyToGoPage() {
  return (
    <Suspense>
      <ReadyToGoForm />
    </Suspense>
  );
}

function ReadyToGoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { entitlements, plansGenerated, recordPlanGenerated, createFromPlan } =
    useProjectStore();

  const [draft, setDraft] = useState<Draft>(() => parseBriefQuery(searchParams));
  const [step, setStep] = useState(() => firstOpenStep(parseBriefQuery(searchParams)));

  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState<ShootingPlan | null>(null);
  const [variant, setVariant] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const quota = canGeneratePlan(entitlements, plansGenerated);

  const stepComplete = useMemo(() => {
    switch (STEPS[step]?.id) {
      case "subject":
        return (
          draft.subject !== null &&
          (draft.subject !== "custom" || draft.customSubject.trim().length >= 2)
        );
      case "device":
        return draft.device !== null;
      case "style":
        return draft.style !== null;
      case "duration":
        return true;
      case "experience":
        return draft.experience !== null;
      case "rig":
        return draft.stabilization !== null;
      default:
        return false;
    }
  }, [step, draft]);

  const buildBrief = useCallback((): ShootBrief | null => {
    if (
      !draft.subject ||
      !draft.device ||
      !draft.style ||
      !draft.experience ||
      !draft.stabilization
    ) {
      return null;
    }
    return {
      subject: draft.subject,
      customSubject:
        draft.subject === "custom" ? draft.customSubject.trim() : undefined,
      device: draft.device,
      style: draft.style,
      durationSec: draft.durationSec,
      experience: draft.experience,
      stabilization: draft.stabilization,
    };
  }, [draft]);

  const generate = useCallback(
    async (nextVariant: number) => {
      const brief = buildBrief();
      if (!brief) return;

      setGenerating(true);
      setError(null);
      try {
        const provider = getPlanProvider();
        const result = await provider.generate(brief, { variant: nextVariant });
        setPlan(result);
        setVariant(nextVariant);
        await recordPlanGenerated();
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "Could not build a plan from those answers.",
        );
      } finally {
        setGenerating(false);
      }
    },
    [buildBrief, recordPlanGenerated],
  );

  const save = useCallback(async () => {
    if (!plan) return;
    setSaving(true);
    setError(null);
    try {
      const project = await createFromPlan(plan);
      router.push(`/project/${project.id}`);
    } catch (e) {
      setSaving(false);
      setError(
        e instanceof Error
          ? `Could not save: ${e.message}`
          : "Could not save this project to local storage.",
      );
    }
  }, [plan, createFromPlan, router]);

  /* ----------------------------------------------------------- Plan result */

  if (plan) {
    return (
      <PageShell>
        <PageHeader
          eyebrow="Your shooting plan"
          title={plan.title}
          backHref="/ready"
          backLabel="Change answers"
          action={
            <Badge tone="lime">
              <Check className="size-3" aria-hidden />
              Ready
            </Badge>
          }
        />

        {error ? (
          <div className="mb-5">
            <ErrorState title="Save failed" description={error} />
          </div>
        ) : null}

        <div className="mb-6 flex flex-col gap-2.5 sm:flex-row">
          <Button onClick={() => void save()} loading={saving} fullWidth size="lg">
            <Save className="size-[18px]" aria-hidden />
            Save project
          </Button>
          <Button
            variant="outline"
            size="lg"
            fullWidth
            loading={generating}
            onClick={() => void generate(variant + 1)}
          >
            Try a different plan
          </Button>
        </div>

        <p className="mb-7 text-center text-[12px] leading-relaxed text-bone-500">
          Saving stores this plan on this device so you can open the guided
          shooting checklist and tick shots off as you record them.
        </p>

        <div className="pb-12">
          <PlanView plan={plan} />
        </div>
      </PageShell>
    );
  }

  /* --------------------------------------------------------- Generating */

  if (generating) {
    return (
      <PageShell>
        <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-4 text-center">
          <Loader2 className="size-7 animate-spin text-lime-400" aria-hidden />
          <div>
            <p className="text-sm font-medium text-bone-50">Building your plan</p>
            <p className="mt-1.5 max-w-[34ch] text-[13px] leading-relaxed text-bone-500">
              Selecting shots, allocating durations and matching the camera
              settings to your device.
            </p>
          </div>
        </div>
      </PageShell>
    );
  }

  /* -------------------------------------------------------------- Form */

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <PageShell>
      <PageHeader
        eyebrow={`Step ${step + 1} of ${STEPS.length}`}
        title="Ready to Go"
        backHref={step === 0 ? "/" : undefined}
        backLabel="Home"
      />

      {/* Step rail */}
      <div className="mb-7 flex gap-1.5" role="list" aria-label="Progress">
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            role="listitem"
            aria-label={`${s.label}${i < step ? " (done)" : i === step ? " (current)" : ""}`}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i <= step ? "bg-lime-400" : "bg-ink-700"
            }`}
          />
        ))}
      </div>

      {!quota.allowed ? (
        <div className="mb-6">
          <Card className="space-y-3 border-lime-400/20 bg-lime-950/40 p-5">
            <Badge tone="lime">Free plan limit reached</Badge>
            <p className="text-sm leading-relaxed text-bone-200">{quota.reason}</p>
            <p className="text-[12px] leading-relaxed text-bone-500">
              Pro is not available to buy yet — no payment provider is connected.
              Your existing projects stay accessible.
            </p>
            <ButtonLink href="/projects" variant="outline" size="sm">
              Open saved projects
            </ButtonLink>
          </Card>
        </div>
      ) : null}

      {error ? (
        <div className="mb-6">
          <ErrorState title="Generation failed" description={error} />
        </div>
      ) : null}

      <div key={current?.id} className="animate-rise">
        {current?.id === "subject" ? (
          <Step
            question="What do you want to film?"
            hint="This decides the shot library your plan is built from."
          >
            <div className="grid grid-cols-2 gap-2.5">
              {SUBJECT_ORDER.map((id) => (
                <OptionCard
                  key={id}
                  label={SUBJECTS[id].label}
                  description={SUBJECTS[id].blurb}
                  icon={SUBJECT_ICONS[id]}
                  selected={draft.subject === id}
                  onSelect={() => setDraft((d) => ({ ...d, subject: id }))}
                />
              ))}
            </div>

            {draft.subject === "custom" ? (
              <div className="mt-3.5">
                <label
                  htmlFor="custom-subject"
                  className="mb-2 block text-[13px] text-bone-400"
                >
                  What is it? Be specific.
                </label>
                <input
                  id="custom-subject"
                  type="text"
                  value={draft.customSubject}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, customSubject: e.target.value }))
                  }
                  placeholder="A vintage record player"
                  maxLength={60}
                  autoComplete="off"
                  className="h-12 w-full rounded-field border border-bone-50/10 bg-ink-850 px-4 text-sm text-bone-50 placeholder:text-bone-600 focus:border-lime-400/50 focus:outline-none"
                />
                <p className="mt-2 text-[12px] text-bone-600">
                  Custom subjects use the general-purpose shot grammar: wide,
                  medium, detail, movement, closer.
                </p>
              </div>
            ) : null}
          </Step>
        ) : null}

        {current?.id === "device" ? (
          <Step
            question="What are you filming on?"
            hint="Camera settings and menu paths are written for this device."
          >
            <div className="space-y-2.5">
              {DEVICE_ORDER.map((id) => (
                <OptionCard
                  key={id}
                  label={
                    id === "iphone"
                      ? "iPhone"
                      : id === "android"
                        ? "Android phone"
                        : "Dedicated camera"
                  }
                  description={
                    id === "camera"
                      ? "Mirrorless, DSLR or action camera"
                      : "Using the built-in camera app"
                  }
                  icon={DEVICE_ICONS[id]}
                  selected={draft.device === id}
                  onSelect={() => setDraft((d) => ({ ...d, device: id }))}
                />
              ))}
            </div>
          </Step>
        ) : null}

        {current?.id === "style" ? (
          <Step
            question="What should it feel like?"
            hint="Style sets the pacing, shot count, transitions and edit order."
          >
            <div className="space-y-2.5">
              {STYLE_ORDER.map((id) => {
                const gate = canUseStyle(entitlements, id);
                return (
                  <OptionCard
                    key={id}
                    label={STYLES[id].label}
                    description={STYLES[id].blurb}
                    selected={draft.style === id}
                    locked={!gate.allowed}
                    lockedHint={gate.allowed ? undefined : gate.reason}
                    onSelect={() => setDraft((d) => ({ ...d, style: id }))}
                  />
                );
              })}
            </div>
          </Step>
        ) : null}

        {current?.id === "duration" ? (
          <Step
            question="How long is the final video?"
            hint="Runtime is divided across shots by how much screen time each one needs."
          >
            <Segmented<DurationSec>
              ariaLabel="Video duration"
              value={draft.durationSec}
              onChange={(durationSec) => setDraft((d) => ({ ...d, durationSec }))}
              options={[
                { value: 15, label: "15s", sub: "Hook" },
                { value: 30, label: "30s", sub: "Standard" },
                { value: 60, label: "60s", sub: "Full story" },
              ]}
            />
            {draft.style ? (
              <p className="mt-3.5 text-[13px] leading-relaxed text-bone-500">
                A {draft.durationSec}-second {STYLES[draft.style].label} video
                works out to{" "}
                <span className="text-bone-200">
                  {STYLES[draft.style].shotCount[draft.durationSec]} shots
                </span>
                .
              </p>
            ) : null}
          </Step>
        ) : null}

        {current?.id === "experience" ? (
          <Step
            question="How much have you filmed before?"
            hint="This filters out shots that need skills you have not built yet."
          >
            <div className="space-y-2.5">
              {EXPERIENCE_ORDER.map((id) => (
                <OptionCard
                  key={id}
                  label={EXPERIENCE[id].label}
                  description={EXPERIENCE[id].description}
                  selected={draft.experience === id}
                  onSelect={() => setDraft((d) => ({ ...d, experience: id }))}
                />
              ))}
            </div>
          </Step>
        ) : null}

        {current?.id === "rig" ? (
          <Step
            question="How are you holding the camera?"
            hint="Movements your rig cannot do cleanly are swapped for ones it can."
          >
            <div className="space-y-2.5">
              {STABILIZATION_ORDER.map((id) => (
                <OptionCard
                  key={id}
                  label={STABILIZATION[id].label}
                  description={STABILIZATION[id].description}
                  icon={STABILIZATION_ICONS[id]}
                  selected={draft.stabilization === id}
                  onSelect={() => setDraft((d) => ({ ...d, stabilization: id }))}
                />
              ))}
            </div>
          </Step>
        ) : null}
      </div>

      {/* Nav */}
      <div className="sticky bottom-[calc(5.25rem+env(safe-area-inset-bottom))] mt-8 flex gap-2.5 bg-gradient-to-t from-ink-900 via-ink-900 to-transparent py-4 lg:static lg:bottom-auto lg:bg-none">
        {step > 0 ? (
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            aria-label="Previous step"
          >
            <ArrowLeft className="size-[18px]" aria-hidden />
          </Button>
        ) : null}

        <Button
          size="lg"
          fullWidth
          disabled={!stepComplete || (isLast && !quota.allowed)}
          onClick={() => {
            if (isLast) void generate(variant);
            else setStep((s) => s + 1);
          }}
        >
          {isLast ? "Generate shooting plan" : "Continue"}
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </PageShell>
  );
}

function firstOpenStep(draft: Draft): number {
  if (
    !draft.subject ||
    (draft.subject === "custom" && draft.customSubject.trim().length < 2)
  ) {
    return 0;
  }
  if (!draft.device) return 1;
  if (!draft.style) return 2;
  if (!draft.experience) return 4;
  if (!draft.stabilization) return 5;
  return 0;
}

function Step({
  question,
  hint,
  children,
}: {
  question: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg leading-snug font-semibold">{question}</h2>
      <p className="mt-1.5 mb-5 text-[13px] leading-relaxed text-bone-400">{hint}</p>
      {children}
    </section>
  );
}
