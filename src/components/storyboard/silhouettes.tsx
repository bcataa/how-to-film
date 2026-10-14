import type { SilhouetteId } from "@/lib/types";

/**
 * Original silhouettes drawn in a 100×100 box, centred on (50, 50).
 * Kept as plain paths so storyboard frames are generated rather than
 * licensed — there is no third-party imagery anywhere in the app.
 */
export function Silhouette({ id }: { id: SilhouetteId }) {
  switch (id) {
    case "car":
      return (
        <g>
          <path d="M6 66 L13 51 Q17 43 30 41 L45 30 Q53 26 63 28 L79 35 Q89 39 93 51 L95 64 Q95 70 89 70 L12 70 Q6 70 6 66 Z" />
          <circle cx="28" cy="70" r="9" />
          <circle cx="76" cy="70" r="9" />
          <path
            d="M34 41 L46 33 Q52 30 60 32 L72 37 Z"
            className="opacity-45"
          />
        </g>
      );

    case "bottle":
      return (
        <g>
          <rect x="43" y="10" width="14" height="9" rx="2" />
          <path d="M44 19 L44 31 Q30 39 30 54 L30 84 Q30 91 37 91 L63 91 Q70 91 70 84 L70 54 Q70 39 56 31 L56 19 Z" />
          <rect x="33" y="58" width="34" height="19" rx="2" className="opacity-40" />
        </g>
      );

    case "person-full":
      return (
        <g>
          <circle cx="50" cy="16" r="9" />
          <path d="M50 26 Q38 28 36 42 L34 62 Q34 66 38 66 L41 66 L39 94 Q39 97 43 97 L46 97 L49 72 L51 72 L54 97 L57 97 Q61 97 61 94 L59 66 L62 66 Q66 66 66 62 L64 42 Q62 28 50 26 Z" />
        </g>
      );

    case "person-bust":
      return (
        <g>
          <circle cx="50" cy="32" r="19" />
          <path d="M50 54 Q24 58 18 86 L16 98 L84 98 L82 86 Q76 58 50 54 Z" />
        </g>
      );

    case "garment":
      return (
        <g>
          <path d="M36 16 L28 22 Q16 28 14 44 L24 48 L27 40 L27 92 Q27 96 31 96 L69 96 Q73 96 73 92 L73 40 L76 48 L86 44 Q84 28 72 22 L64 16 Q50 26 36 16 Z" />
          <path d="M36 16 Q50 26 64 16 L58 14 Q50 19 42 14 Z" className="opacity-45" />
        </g>
      );

    case "plate":
      return (
        <g>
          <ellipse cx="50" cy="62" rx="42" ry="17" />
          <ellipse cx="50" cy="60" rx="30" ry="11" className="opacity-35" />
          <path
            d="M34 56 Q40 40 50 40 Q60 40 66 56 Z"
            className="opacity-70"
          />
          <circle cx="44" cy="50" r="4" className="opacity-50" />
          <circle cx="57" cy="52" r="3" className="opacity-50" />
        </g>
      );

    case "landscape":
      return (
        <g>
          <circle cx="72" cy="30" r="10" className="opacity-55" />
          <path d="M0 76 L22 48 L38 66 L52 42 L74 76 Z" />
          <path d="M60 76 L80 54 L100 76 Z" className="opacity-55" />
          <rect x="0" y="76" width="100" height="6" className="opacity-35" />
        </g>
      );

    case "object":
    default:
      return (
        <g>
          <path d="M24 38 L50 24 L76 38 L76 70 L50 84 L24 70 Z" />
          <path d="M24 38 L50 52 L76 38" className="opacity-0" />
          <path d="M50 52 L76 38 L76 70 L50 84 Z" className="opacity-45" />
        </g>
      );
  }
}
