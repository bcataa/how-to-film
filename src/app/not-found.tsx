import { ButtonLink } from "@/components/ui/Button";
import { PageShell } from "@/components/ui/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-4 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-lime-400">
          404
        </p>
        <h1 className="text-2xl font-semibold">Nothing here</h1>
        <p className="max-w-[34ch] text-[13px] leading-relaxed text-bone-400">
          That page does not exist. The main workflow starts from the home
          dashboard.
        </p>
        <ButtonLink href="/" size="md" className="mt-2">
          Go home
        </ButtonLink>
      </div>
    </PageShell>
  );
}
