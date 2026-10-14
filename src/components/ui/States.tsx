import { cn } from "@/lib/cn";
import { Card } from "./Card";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "flex flex-col items-center gap-3 border-dashed border-bone-50/10 bg-ink-850/40 px-6 py-10 text-center",
        className,
      )}
    >
      {icon ? (
        <div className="grid size-11 place-items-center rounded-full bg-ink-800 text-bone-400">
          {icon}
        </div>
      ) : null}
      <div className="space-y-1">
        <p className="text-sm font-medium text-bone-200">{title}</p>
        {description ? (
          <p className="mx-auto max-w-[32ch] text-[13px] leading-relaxed text-bone-500">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </Card>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-field bg-ink-800", className)}
      aria-hidden
    />
  );
}

export function ErrorState({
  title = "Something went wrong",
  description,
  retry,
}: {
  title?: string;
  description?: string;
  retry?: React.ReactNode;
}) {
  return (
    <Card className="space-y-2 border-rose-400/20 bg-rose-400/[0.04] p-5" role="alert">
      <p className="text-sm font-medium text-rose-400">{title}</p>
      {description ? (
        <p className="text-[13px] leading-relaxed text-bone-400">{description}</p>
      ) : null}
      {retry}
    </Card>
  );
}
