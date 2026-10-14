"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export function CheckRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className="flex w-full items-start gap-3 rounded-field px-1 py-2.5 text-left transition-colors hover:bg-ink-800"
    >
      <span
        className={cn(
          "mt-[1px] grid size-5 shrink-0 place-items-center rounded-md border transition-colors duration-200",
          checked ? "border-lime-400 bg-lime-400 text-ink-950" : "border-bone-50/20",
        )}
        aria-hidden
      >
        {checked ? <Check className="size-3.5" /> : null}
      </span>
      <span
        className={cn(
          "text-sm leading-relaxed transition-colors",
          checked ? "text-bone-500 line-through" : "text-bone-200",
        )}
      >
        {label}
      </span>
    </button>
  );
}
