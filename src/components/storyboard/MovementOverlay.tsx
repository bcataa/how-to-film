import type { CameraMovement } from "@/lib/types";

/**
 * Camera-movement annotation drawn over a storyboard frame, in the same
 * 100×100 coordinate space as the silhouettes. This is the standard
 * storyboard convention: the arrow shows where the camera goes, not the
 * subject.
 */
export function MovementOverlay({ movement }: { movement: CameraMovement }) {
  const stroke = "stroke-lime-400";
  const common = `${stroke} fill-none`;

  switch (movement) {
    case "static":
      return (
        <g className={common} strokeWidth={1.6} strokeLinecap="round">
          <path d="M14 14 L14 24 M14 14 L24 14" />
          <path d="M86 14 L86 24 M86 14 L76 14" />
          <path d="M14 86 L14 76 M14 86 L24 86" />
          <path d="M86 86 L86 76 M86 86 L76 86" />
        </g>
      );

    case "pan":
      return (
        <g className={common} strokeWidth={2} strokeLinecap="round">
          <path d="M26 90 L74 90" />
          <path d="M66 84 L74 90 L66 96" />
        </g>
      );

    case "tilt":
      return (
        <g className={common} strokeWidth={2} strokeLinecap="round">
          <path d="M90 74 L90 26" />
          <path d="M84 34 L90 26 L96 34" />
        </g>
      );

    case "push-in":
      return (
        <g className={common} strokeWidth={2} strokeLinecap="round">
          <path d="M10 50 L34 50 M26 44 L34 50 L26 56" />
          <path d="M90 50 L66 50 M74 44 L66 50 L74 56" />
        </g>
      );

    case "pull-out":
      return (
        <g className={common} strokeWidth={2} strokeLinecap="round">
          <path d="M34 50 L10 50 M18 44 L10 50 L18 56" />
          <path d="M66 50 L90 50 M82 44 L90 50 L82 56" />
        </g>
      );

    case "orbit":
      return (
        <g className={common} strokeWidth={2} strokeLinecap="round">
          <path d="M16 78 Q50 96 84 78" />
          <path d="M76 72 L84 78 L75 83" />
        </g>
      );

    case "tracking":
      return (
        <g className={common} strokeWidth={2} strokeLinecap="round">
          <path d="M20 88 L80 88" />
          <path d="M72 82 L80 88 L72 94" />
          <path d="M20 94 L62 94" strokeWidth={1} className={`${stroke} opacity-50`} />
        </g>
      );

    case "reveal":
      return (
        <g className={common} strokeWidth={2} strokeLinecap="round">
          <rect
            x="4"
            y="18"
            width="18"
            height="64"
            rx="2"
            className="fill-lime-400/15 stroke-lime-400"
            strokeWidth={1.2}
          />
          <path d="M30 50 L72 50 M64 44 L72 50 L64 56" />
        </g>
      );

    case "handheld-drift":
      return (
        <g className={common} strokeWidth={1.8} strokeLinecap="round">
          <path d="M26 90 Q38 84 50 90 Q62 96 74 90" />
          <path d="M67 85 L74 90 L68 95" />
        </g>
      );

    case "whip":
      return (
        <g className={common} strokeWidth={2} strokeLinecap="round">
          <path d="M28 90 L76 90" />
          <path d="M66 84 L76 90 L66 96" />
          <path d="M34 82 L58 82" className={`${stroke} opacity-45`} strokeWidth={1.2} />
          <path d="M34 98 L58 98" className={`${stroke} opacity-45`} strokeWidth={1.2} />
        </g>
      );

    default:
      return null;
  }
}
