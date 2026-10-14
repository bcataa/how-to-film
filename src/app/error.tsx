"use client";

import { Button, ButtonLink } from "@/components/ui/Button";
import { PageShell } from "@/components/ui/PageShell";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageShell>
      <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-4 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-rose-400">
          Error
        </p>
        <h1 className="text-2xl font-semibold">Something broke</h1>
        <p className="max-w-[38ch] text-[13px] leading-relaxed text-bone-400">
          {error.message || "An unexpected error occurred."}
        </p>
        <div className="mt-2 flex gap-2.5">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/" variant="outline">
            Go home
          </ButtonLink>
        </div>
      </div>
    </PageShell>
  );
}
