import {
  Clock,
  Film,
  Info,
  Lightbulb,
  Music,
  PackageCheck,
  Scissors,
  Share2,
  Sparkles,
} from "lucide-react";
import type { ShootingPlan } from "@/lib/types";
import { Badge, Meta } from "@/components/ui/Badge";
import { Card, SectionHeader } from "@/components/ui/Card";
import { ShotCard } from "./ShotCard";
import { getDevice, getStabilization, getStyle } from "@/lib/plan";
import { clock } from "@/lib/format";

/**
 * Renders a complete shooting plan. Used for both an unsaved preview in the
 * Ready to Go flow and a saved project, so the two can never drift apart.
 */
export function PlanView({ plan }: { plan: ShootingPlan }) {
  const style = getStyle(plan.brief.style);
  const device = getDevice(plan.brief.device);
  const rig = getStabilization(plan.brief.stabilization);

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------ Summary */}
      <Card className="cine-wash p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="lime">{style.label}</Badge>
          <Badge>{device.label}</Badge>
          <Badge>{rig.label}</Badge>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-bone-200">
          {plan.logline}
        </p>

        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-bone-50/8 pt-4">
          <Stat icon={<Film className="size-3.5" aria-hidden />} label="Shots">
            {plan.shots.length}
          </Stat>
          <Stat icon={<Clock className="size-3.5" aria-hidden />} label="Runtime">
            {clock(plan.totalDurationSec)}
          </Stat>
          <Stat icon={<Share2 className="size-3.5" aria-hidden />} label="Format">
            {plan.exportRecipe.frameRate}
          </Stat>
        </dl>
      </Card>

      <SourceNotice plan={plan} />

      {/* -------------------------------------------------------- Before you shoot */}
      <section>
        <SectionHeader
          title="Before you shoot"
          hint="Do these first — they take two minutes and save a reshoot"
        />
        <Card className="p-4">
          <ul className="space-y-2.5">
            {plan.prepChecklist.map((item) => (
              <li key={item.id} className="flex gap-2.5">
                <span
                  className="mt-[7px] size-1.5 shrink-0 rounded-full bg-lime-400"
                  aria-hidden
                />
                <span className="text-[13px] leading-relaxed text-bone-200">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* ----------------------------------------------------------- Storyboard */}
      <section>
        <SectionHeader
          title="Storyboard"
          hint={`${plan.shots.length} shots · tap any shot for full instructions`}
        />
        <div className="space-y-2.5">
          {plan.shots.map((shot) => (
            <ShotCard key={shot.id} shot={shot} />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- Lighting */}
      <section>
        <SectionHeader title="Lighting plan" />
        <Card className="p-4">
          <ul className="space-y-3">
            {plan.lightingPlan.map((line, i) => (
              <li key={i} className="flex gap-2.5">
                <Lightbulb
                  className="mt-0.5 size-3.5 shrink-0 text-amber-400"
                  aria-hidden
                />
                <span className="text-[13px] leading-relaxed text-bone-200">{line}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* ---------------------------------------------------------------- Audio */}
      <section>
        <SectionHeader title="Music and sound" />
        <Card className="space-y-4 p-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Music className="size-3.5 text-teal-400" aria-hidden />
              <Meta>Track brief · {plan.audio.bpmRange}</Meta>
            </div>
            <p className="text-[13px] leading-relaxed text-bone-200">
              {plan.audio.musicBrief}
            </p>
          </div>

          <ul className="space-y-2.5 border-t border-bone-50/8 pt-4">
            {plan.audio.soundDesign.map((line, i) => (
              <li key={i} className="flex gap-2.5">
                <span
                  className="mt-[7px] size-1.5 shrink-0 rounded-full bg-teal-400"
                  aria-hidden
                />
                <span className="text-[13px] leading-relaxed text-bone-200">{line}</span>
              </li>
            ))}
          </ul>

          <p className="border-t border-bone-50/8 pt-4 text-[12px] leading-relaxed text-bone-500">
            {plan.audio.sourcingNote}
          </p>
        </Card>
      </section>

      {/* ------------------------------------------------------------ Edit steps */}
      <section>
        <SectionHeader
          title="How to edit it"
          hint="In this order — structure before polish"
        />
        <div className="space-y-2.5">
          {plan.editSteps.map((step, i) => (
            <Card key={step.id} className="flex gap-3.5 p-4">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-ink-800 font-mono text-[11px] text-lime-400">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-[13px] font-medium text-bone-50">{step.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-bone-400">
                  {step.detail}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------------- Export */}
      <section>
        <SectionHeader title="Export recipe" />
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Scissors className="size-3.5 text-lime-400" aria-hidden />
            <Meta>{plan.exportRecipe.platform}</Meta>
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-3 border-y border-bone-50/8 py-3.5">
            <SmallStat label="Resolution" value={plan.exportRecipe.resolution} />
            <SmallStat label="Frame rate" value={plan.exportRecipe.frameRate} />
            <SmallStat
              label="Aspect ratio"
              value={plan.exportRecipe.aspectRatio}
              className="col-span-2"
            />
          </dl>

          <ul className="mt-3.5 space-y-2.5">
            {plan.exportRecipe.notes.map((note, i) => (
              <li key={i} className="flex gap-2.5">
                <span
                  className="mt-[7px] size-1.5 shrink-0 rounded-full bg-bone-600"
                  aria-hidden
                />
                <span className="text-[13px] leading-relaxed text-bone-200">{note}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* ------------------------------------------------------------ Gear notes */}
      <section>
        <SectionHeader title="Gear and setup notes" />
        <Card className="p-4">
          <ul className="space-y-3">
            {plan.gearNotes.map((note, i) => (
              <li key={i} className="flex gap-2.5">
                <PackageCheck
                  className="mt-0.5 size-3.5 shrink-0 text-bone-500"
                  aria-hidden
                />
                <span className="text-[13px] leading-relaxed text-bone-200">{note}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}

/**
 * Honest labelling of where the plan came from. If an AI provider is added
 * later this reads "Generated by <model>" instead — but it must never claim
 * AI involvement for a template plan.
 */
function SourceNotice({ plan }: { plan: ShootingPlan }) {
  const { source } = plan;

  return (
    <Card className="flex gap-3 border-bone-50/8 bg-ink-850/50 p-3.5">
      {source.kind === "template" ? (
        <Info className="mt-0.5 size-3.5 shrink-0 text-bone-500" aria-hidden />
      ) : (
        <Sparkles className="mt-0.5 size-3.5 shrink-0 text-lime-400" aria-hidden />
      )}
      <p className="text-[12px] leading-relaxed text-bone-500">
        {source.kind === "template" ? (
          <>
            Built on-device from the app&apos;s shot library, matched to your
            subject, style, device and rig.{" "}
            <span className="text-bone-400">No AI service is connected.</span>
          </>
        ) : (
          <>
            Generated by {source.provider} ({source.model}).
          </>
        )}
      </p>
    </Card>
  );
}

function Stat({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[11px] text-bone-600">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 font-mono text-[15px] text-bone-50">{children}</dd>
    </div>
  );
}

function SmallStat({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-[11px] text-bone-600">{label}</dt>
      <dd className="mt-0.5 text-[13px] text-bone-200">{value}</dd>
    </div>
  );
}
