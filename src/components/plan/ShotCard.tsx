import {
  AlertTriangle,
  ChevronDown,
  Lightbulb,
  ListChecks,
  Scissors,
  Settings2,
} from "lucide-react";
import type { Shot } from "@/lib/types";
import { Badge, Meta } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ShotFrame } from "@/components/storyboard/ShotFrame";
import { humanize, secs } from "@/lib/format";

/**
 * One storyboard frame plus every detail needed to shoot it. Uses a native
 * <details> element so the whole card works without JavaScript and keeps
 * keyboard and screen-reader behaviour for free.
 */
export function ShotCard({ shot }: { shot: Shot }) {
  return (
    <Card className="overflow-hidden">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-start gap-3.5 p-3.5 transition-colors hover:bg-ink-800/60">
          <ShotFrame art={shot.art} className="h-[92px] w-[69px] shrink-0" />

          <div className="min-w-0 flex-1 py-0.5">
            <div className="flex items-center gap-2">
              <Meta className="text-lime-400">{shot.slate}</Meta>
              <Meta>{secs(shot.durationSec)}</Meta>
              {shot.difficulty === 3 ? (
                <Badge tone="amber">Advanced</Badge>
              ) : null}
            </div>

            <h3 className="mt-1 text-sm leading-snug font-medium text-bone-50">
              {shot.title}
            </h3>

            <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-bone-400">
              {shot.purpose}
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge>{humanize(shot.framing)}</Badge>
              <Badge>{humanize(shot.angle)}</Badge>
              <Badge tone="teal">{humanize(shot.movement)}</Badge>
            </div>
          </div>

          <ChevronDown
            className="mt-1 size-4 shrink-0 text-bone-500 transition-transform duration-300 group-open:rotate-180"
            aria-hidden
          />
        </summary>

        <div className="space-y-4 border-t border-bone-50/8 px-3.5 py-4">
          <Block icon={<ListChecks className="size-3.5" aria-hidden />} title="How to shoot it">
            <ol className="space-y-2">
              {shot.howTo.map((step, i) => (
                <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-bone-200">
                  <span className="mt-[2px] font-mono text-[10px] text-bone-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block icon={<Lightbulb className="size-3.5" aria-hidden />} title="Lighting">
            <p className="text-[13px] leading-relaxed text-bone-200">{shot.lighting}</p>
          </Block>

          <div className="rounded-field border border-amber-400/20 bg-amber-400/[0.05] p-3">
            <div className="flex gap-2.5">
              <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-amber-400" aria-hidden />
              <div>
                <p className="text-[11px] font-medium tracking-wide text-amber-400">
                  Watch out for
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-bone-200">
                  {shot.watchOutFor}
                </p>
              </div>
            </div>
          </div>

          <Block icon={<Settings2 className="size-3.5" aria-hidden />} title="Recording settings">
            <dl className="space-y-2.5">
              <SettingRow label="Resolution" value={shot.settings.resolution} />
              <SettingRow label="Frame rate" value={shot.settings.frameRate} />
              <SettingRow label="Aspect ratio" value={shot.settings.aspectRatio} />
              <SettingRow label="Exposure" value={shot.settings.exposure} />
              <SettingRow label="Focus" value={shot.settings.focus} />
              <SettingRow label="White balance" value={shot.settings.whiteBalance} />
              <SettingRow label="Lens" value={shot.settings.lens} />
              <SettingRow label="Audio" value={shot.settings.audio} />
              <SettingRow label="Where to find it" value={shot.settings.deviceHint} />
            </dl>
          </Block>

          {shot.transitionOut ? (
            <Block icon={<Scissors className="size-3.5" aria-hidden />} title="Cut into the next shot">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[13px] font-medium text-bone-50">
                  {shot.transitionOut.name}
                </span>
                <Badge tone={shot.transitionOut.kind === "in-camera" ? "lime" : "neutral"}>
                  {shot.transitionOut.kind === "in-camera"
                    ? "Shoot this deliberately"
                    : shot.transitionOut.kind === "edit"
                      ? "In the edit"
                      : "Straight cut"}
                </Badge>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-bone-400">
                {shot.transitionOut.how}
              </p>
            </Block>
          ) : null}
        </div>
      </details>
    </Card>
  );
}

function Block({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h4 className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-bone-500">
        {icon}
        {title}
      </h4>
      {children}
    </section>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <dt className="shrink-0 text-[11px] text-bone-600 sm:w-[108px] sm:pt-[1px]">
        {label}
      </dt>
      <dd className="text-[13px] leading-relaxed text-bone-200">{value}</dd>
    </div>
  );
}
