import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";

/** Consistent page gutter and max width across every route. */
export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-2xl px-4 lg:max-w-3xl lg:px-8", className)}>
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  backHref,
  backLabel = "Back",
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="pt-6 pb-5 lg:pt-10">
      {backHref ? (
        <Link
          href={backHref}
          className="mb-4 inline-flex items-center gap-1 text-[13px] text-bone-400 transition-colors hover:text-bone-50"
        >
          <ChevronLeft className="size-4" aria-hidden />
          {backLabel}
        </Link>
      ) : null}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-lime-400">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-[26px] leading-tight font-semibold lg:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 text-sm leading-relaxed text-bone-400">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0 pt-1">{action}</div> : null}
      </div>
    </header>
  );
}
