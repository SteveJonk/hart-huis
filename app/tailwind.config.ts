import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#ece4e1",
        sand: {
          DEFAULT: "#d7c3b9",
          deep: "#c6ab9f",
        },
        ink: {
          DEFAULT: "#241f1c",
          70: "#5f544e",
          45: "#8c7f78",
        },
        sage: {
          DEFAULT: "#a9b89b",
          hover: "#97a888",
          deep: "#5f7057",
        },
        burgundy: "#5c2a2f",
        moss: "#1d241a",
        mist: "#d8ccc6",
        taupe: "#b8a8a1",
        stone: "#8b7a73",
        clay: "#bcaca5",
      },
      fontFamily: {
        display: [
          "var(--font-schibsted)",
          "Bodoni Moda",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "var(--font-inter-tight)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      screens: {
        xs: "400px",
        sm: "760px",
        md: "960px",
        lg: "1120px",
        xl: "1360px",
      },
      fontSize: {
        eyebrow: ["0.68rem", { lineHeight: "1", letterSpacing: "0.24em" }],
        lead: ["1.06rem", { lineHeight: "1.7" }],
        nav: ["0.845rem", { lineHeight: "1.2", letterSpacing: "0.01em" }],
        btn: ["0.9rem", { lineHeight: "1.2", letterSpacing: "0.01em" }],
        "btn-sm": ["0.84rem", { lineHeight: "1.2", letterSpacing: "0.01em" }],
        arrow: ["0.86rem", { lineHeight: "1.2", letterSpacing: "0.02em" }],
      },
      spacing: {
        wrap: "44px",
        "wrap-md": "24px",
        "wrap-sm": "20px",
        section: "130px",
        "section-sm": "82px",
      },
      maxWidth: {
        site: "1280px",
      },
      borderRadius: {
        pill: "100px",
        arch: "220px 220px 4px 4px",
      },
      boxShadow: {
        stamp: "0 18px 46px -22px rgba(36, 31, 28, 0.5)",
        story: "0 26px 60px -26px rgba(36, 31, 28, 0.55)",
        card: "0 30px 58px -34px rgba(36, 31, 28, 0.42)",
        listing: "0 30px 60px -34px rgba(36, 31, 28, 0.5)",
        wa: "0 16px 36px -14px rgba(36, 31, 28, 0.45)",
        topbar: "0 1px 0 rgba(36, 31, 28, 0.09)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      zIndex: {
        wa: "110",
        mobilenav: "115",
        topbar: "120",
        burger: "130",
      },
      keyframes: {
        heroCycle: {
          "0%": { opacity: "0", transform: "scale(1.07)" },
          "4%": { opacity: "1" },
          "30%": { opacity: "1" },
          "36%": { opacity: "0", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(1)" },
        },
        cue: {
          "0%, 100%": { transform: "scaleY(0.4)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
        },
        spinIn: {
          from: { opacity: "0", transform: "scale(0.7) rotate(-16deg)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "hero-cycle": "heroCycle 22.5s infinite",
        cue: "cue 2.4s infinite",
        "spin-in": "spinIn 0.9s cubic-bezier(0.22, 0.61, 0.36, 1) both",
      },
    },
  },
} satisfies Config;

export default config;
