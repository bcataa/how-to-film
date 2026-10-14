import { cn } from "@/lib/cn";

export function Progress({
  value,
  max = 100,
  className,
  label,
}: {
  value: number;
  max?: number;
  className?: string;
  label?: string;
}) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-ink-700", className)}
    >
      <div
        className="h-full rounded-full bg-lime-400 transition-[width] duration-500 ease-[var(--ease-out-soft)]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/** Compact circular progress used in the dashboard header. */
export function ProgressRing({
  value,
  max,
  size = 44,
  children,
}: {
  value: number;
  max: number;
  size?: number;
  children?: React.ReactNode;
}) {
  const r = (size - 4) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = max <= 0 ? 0 : Math.min(1, value / max);
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={2.5}
          className="stroke-ink-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct)}
          className="stroke-lime-400 transition-[stroke-dashoffset] duration-700 ease-[var(--ease-out-soft)]"
        />
      </svg>
      <span className="absolute font-mono text-[10px] text-bone-200">{children}</span>
    </div>
  );
}
