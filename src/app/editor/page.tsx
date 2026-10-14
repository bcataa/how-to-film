import { Construction } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader, PageShell } from "@/components/ui/PageShell";
import { Meta } from "@/components/ui/Badge";

/**
 * Honest placeholder. The editor is a later milestone and this page
 * deliberately does not render a mock timeline — a fake editor would be worse
 * than no editor.
 */
export default function EditorPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Editor"
        title="Not built yet"
        description="This is a real gap, not a loading state. Here is exactly what is planned and why it has not been built yet."
      />

      <Card className="mb-5 flex gap-3.5 p-5">
        <Construction className="mt-0.5 size-4 shrink-0 text-amber-400" aria-hidden />
        <p className="text-[13px] leading-relaxed text-bone-200">
          Trimming, reordering and previewing clips can all be built on the
          browser&apos;s native video APIs and will work on any phone. Rendering
          a finished file is the hard part: it needs{" "}
          <span className="font-mono text-[12px] text-bone-50">ffmpeg.wasm</span>{" "}
          or the WebCodecs API, both of which have real limits on mobile
          Safari. Until export genuinely works, this screen will not pretend it
          does.
        </p>
      </Card>

      <Card className="mb-5 p-5">
        <Meta>Planned in order</Meta>
        <ol className="mt-3 space-y-3">
          {[
            "Import clips from the device and show real thumbnails and durations.",
            "Preview a clip and set in and out points on a scrubber.",
            "Reorder and delete clips, and play the whole sequence back in order.",
            "Burn-in text overlays and attach a music track.",
            "Render a single MP4 export, with an honest warning where the device cannot handle it.",
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-[2px] grid size-5 shrink-0 place-items-center rounded-full bg-ink-800 font-mono text-[10px] text-lime-400">
                {i + 1}
              </span>
              <span className="text-[13px] leading-relaxed text-bone-200">{item}</span>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="mb-6 p-5">
        <Meta>In the meantime</Meta>
        <p className="mt-2.5 text-[13px] leading-relaxed text-bone-200">
          Every shooting plan includes a step-by-step edit order written for
          whichever app you already use — CapCut, InShot, iMovie or Premiere. It
          covers assembly order, trim targets, where to cut to the beat and the
          exact export settings.
        </p>
        <ButtonLink href="/projects" variant="outline" size="sm" className="mt-4">
          Open a plan&apos;s edit steps
        </ButtonLink>
      </Card>
    </PageShell>
  );
}
