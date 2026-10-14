"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex select-none items-center justify-center gap-2 rounded-field font-medium " +
  "transition-[transform,background-color,border-color,opacity] duration-200 ease-[var(--ease-out-soft)] " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary: "bg-lime-400 text-ink-950 hover:bg-lime-300",
  secondary: "bg-ink-750 text-bone-50 hover:bg-ink-700",
  ghost: "text-bone-200 hover:bg-ink-800 hover:text-bone-50",
  outline:
    "border border-bone-50/12 bg-ink-850/60 text-bone-50 hover:border-bone-50/25 hover:bg-ink-800",
  danger: "bg-rose-400/12 text-rose-400 hover:bg-rose-400/20",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-6 text-[15px]",
};

interface SharedProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function styles({ variant = "primary", size = "md", fullWidth, className }: SharedProps) {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
}

export const Button = forwardRef<
  HTMLButtonElement,
  SharedProps & Omit<React.ComponentPropsWithoutRef<"button">, "children" | "className">
>(function Button(
  { variant, size, fullWidth, loading, className, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled ?? loading}
      aria-busy={loading || undefined}
      className={styles({ variant, size, fullWidth, className })}
      {...rest}
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden />
          <span className="opacity-80">{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
});

export function ButtonLink({
  href,
  variant,
  size,
  fullWidth,
  className,
  children,
  ...rest
}: SharedProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "children" | "className"
  >) {
  return (
    <Link href={href} className={styles({ variant, size, fullWidth, className })} {...rest}>
      {children}
    </Link>
  );
}
