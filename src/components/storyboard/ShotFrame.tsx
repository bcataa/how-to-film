import type { CameraAngle, FramingSize, ShotFrameArt } from "@/lib/types";
import { cn } from "@/lib/cn";
import { MovementOverlay } from "./MovementOverlay";
import { Silhouette } from "./silhouettes";

/** How much of the frame height the subject fills at each framing size. */
const FRAMING_SCALE: Record<FramingSize, number> = {
  "extreme-wide": 0.26,
  wide: 0.46,
  medium: 0.72,
  "close-up": 1.25,
  "extreme-close-up": 2.1,
};

/**
 * Angle changes where the camera sits relative to the subject, which in a
 * flat drawing reads as vertical offset plus a small rotation.
 */
const ANGLE_TRANSFORM: Record<CameraAngle, { dy: number; rotate: number }> = {
  "eye-level": { dy: 0, rotate: 0 },
  "low-angle": { dy: 14, rotate: 0 },
  "high-angle": { dy: -10, rotate: 0 },
  "ground-level": { dy: 24, rotate: 0 },
  overhead: { dy: 0, rotate: 0 },
  dutch: { dy: 0, rotate: -8 },
  "over-the-shoulder": { dy: 6, rotate: 0 },
};

export function ShotFrame({
  art,
  className,
  showOverlay = true,
}: {
  art: ShotFrameArt;
  className?: string;
  showOverlay?: boolean;
}) {
  const scale = FRAMING_SCALE[art.framing];
  const { dy, rotate } = ANGLE_TRANSFORM[art.angle];

  // subjectX is 0..1 across the frame; convert to a translation from centre.
  const dx = Math.round((art.subjectX - 0.5) * 1000) / 10;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[0.75rem] border border-bone-50/8 bg-ink-800",
        className,
      )}
    >
      {/* Horizon wash so the subject does not float in a void. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(191,242,75,0.04) 0%, rgba(12,13,16,0) 45%, rgba(7,8,10,0.55) 100%)",
        }}
        aria-hidden
      />

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        aria-hidden
      >
        {art.thirds ? (
          <g className="stroke-bone-50/10" strokeWidth={0.5}>
            <path d="M33.33 0 L33.33 100" />
            <path d="M66.66 0 L66.66 100" />
            <path d="M0 33.33 L100 33.33" />
            <path d="M0 66.66 L100 66.66" />
          </g>
        ) : null}

        <g
          transform={`translate(${dx} ${dy}) rotate(${rotate} 50 50) translate(50 50) scale(${scale}) translate(-50 -50)`}
          className="fill-bone-400/35 stroke-bone-200/50"
          strokeWidth={1 / scale}
        >
          {art.angle === "overhead" ? (
            <g transform="translate(50 50) scale(1 0.62) translate(-50 -50)">
              <Silhouette id={art.silhouette} />
            </g>
          ) : (
            <Silhouette id={art.silhouette} />
          )}
        </g>

        {/* Foreground shoulder for over-the-shoulder framing. */}
        {art.angle === "over-the-shoulder" ? (
          <path
            d="M-5 105 Q6 58 34 56 Q22 72 24 105 Z"
            className="fill-ink-950/85"
            aria-hidden
          />
        ) : null}

        {showOverlay ? <MovementOverlay movement={art.movement} /> : null}
      </svg>
    </div>
  );
}
