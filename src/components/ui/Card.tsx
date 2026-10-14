import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The single surface primitive. Everything in the app sits on one of these so
 * elevation stays consistent: ink-850 fill, hairline bone border, card radius.
 */
export function Card({
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-card border border-bone-50/8 bg-ink-850",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Card that navigates. Separate component so hover/press affordances only
 *  appear on things that are actually interactive. */
export function CardLink({
  href,
  className,
  children,
  ...rest
}: { href: string } & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href">) {
  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-card border border-bone-50/8 bg-ink-850 transition-colors duration-200",
        "hover:border-bone-50/18 hover:bg-ink-800 active:scale-[0.99]",
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function SectionHeader({
  title,
  action,
  hint,
}: {
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-4 px-1">
      <div className="min-w-0">
        <h2 className="text-[15px] font-semibold text-bone-50">{title}</h2>
        {hint ? <p className="mt-0.5 text-[13px] text-bone-400">{hint}</p> : null}
      </div>
      {action}
    </div>
  );
}
