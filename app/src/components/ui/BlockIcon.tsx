/**
 * Line icons shared by the blocks that offer an icon picker (Benefits, the
 * highlight strip). Values match the icon lists in the matching Sanity schemas.
 */
export type BlockIconName =
  | "person"
  | "camera"
  | "chart"
  | "doc"
  | "house"
  | "renovate"
  | "scale"
  | "search"
  | "eye"
  | "clock"
  | "heart";

type BlockIconProps = {
  icon: BlockIconName;
  size?: number;
};

export function BlockIcon({ icon, size = 19 }: BlockIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  switch (icon) {
    case "person":
      return (
        <svg {...common}>
          <path
            d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "camera":
      return (
        <svg {...common}>
          <path
            d="M3 7h18v13H3zM8 7l1.5-3h5L16 7M12 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path
            d="M4 19V9m5 10V5m5 14v-7m5 7V8"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path
            d="M6 3h9l4 4v14H6zM15 3v4h4M9 13h6M9 17h4"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "house":
      return (
        <svg {...common}>
          <path
            d="M4 10.5 12 4l8 6.5V20H4zM10 20v-6h4v6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "renovate":
      return (
        <svg {...common}>
          <path
            d="M3 20h18M6 20V9l6-4 6 4v11M10 20v-5h4v5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path
            d="M12 4v16M5 9 12 4l7 5M4 20h6M14 20h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path
            d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7v5.3l3.4 2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path
            d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0112 7.5a4.4 4.4 0 017.5 2.9c0 5-7.5 9.6-7.5 9.6z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
