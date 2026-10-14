"use client";

import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Large tap-target option tile used throughout the Ready to Go form.
 * Sized to stay comfortably above the 44px minimum touch target on mobile.
 */
export function OptionCard({
  label,
  description,
  icon,
  selected,
  locked,
  lockedHint,
  onSelect,
}: {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  selected: boolean;
  locked?: boolean;
  lockedHint?: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={locked}
      onClick={onSelect}
      className={cn(
        "group relative flex min-h-[76px] w-full flex-col justify-center gap-1 rounded-field border p-4 text-left",
        "transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-out-soft)]",
        "active:scale-[0.98]",
        selected
          ? "border-lime-400/60 bg-lime-950"
          : "border-bone-50/8 bg-ink-850 hover:border-bone-50/18 hover:bg-ink-800",
        locked && "cursor-not-allowed opacity-50 active:scale-100",
      )}
    >
      <div className="flex items-center gap-2.5">
        {icon ? (
          <span className={cn("shrink-0", selected ? "text-lime-400" : "text-bone-400")}>
            {icon}
          </span>
        ) : null}
        <span
          className={cn(
            "text-sm font-medium",
            selected ? "text-bone-50" : "text-bone-200",
          )}
        >
          {label}
        </span>
        {locked ? <Lock className="ml-auto size-3.5 text-bone-500" aria-hidden /> : null}
        {selected && !locked ? (
          <Check className="ml-auto size-4 shrink-0 text-lime-400" aria-hidden />
        ) : null}
      </div>
      {description || (locked && lockedHint) ? (
        <p className="pl-0.5 text-[12px] leading-snug text-bone-500">
          {locked && lockedHint ? lockedHint : description}
        </p>
      ) : null}
    </button>
  );
}

/** Horizontal segmented control for small, mutually exclusive numeric choices. */
export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { value: T; label: string; sub?: string }[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="grid grid-cols-3 gap-2 rounded-field border border-bone-50/8 bg-ink-850 p-1.5"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-[0.6rem] px-2",
              "transition-colors duration-200",
              active ? "bg-lime-400 text-ink-950" : "text-bone-300 hover:bg-ink-750",
            )}
          >
            <span className="text-sm font-semibold">{opt.label}</span>
            {opt.sub ? (
              <span
                className={cn(
                  "text-[11px]",
                  active ? "text-ink-950/60" : "text-bone-500",
                )}
              >
                {opt.sub}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
