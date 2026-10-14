import { cn } from "@/lib/cn";

type Tone = "neutral" | "lime" | "teal" | "amber" | "rose";

const tones: Record<Tone, string> = {
  neutral: "border-bone-50/10 bg-ink-800 text-bone-400",
  lime: "border-lime-400/25 bg-lime-950 text-lime-400",
  teal: "border-teal-400/25 bg-teal-950 text-teal-400",
  amber: "border-amber-400/25 bg-amber-400/10 text-amber-400",
  rose: "border-rose-400/25 bg-rose-400/10 text-rose-400",
};

export function Badge({
  tone = "neutral",
  icon,
  children,
  className,
}: {
  tone?: Tone;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

/** Monospaced metadata chip — slate codes, durations, resolutions. */
export function Meta({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-wider text-bone-500",
        className,
      )}
    >
      {children}
    </span>
  );
}
