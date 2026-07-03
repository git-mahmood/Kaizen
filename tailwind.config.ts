import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kuro: "#050505",
        void: "#0a0a0a",
        ash: "#111111",
        smoke: "#1a1a1a",
        steel: "#2a2a2a",
        stone: "#3a3a3a",
        muted: "#6b6b6b",
        silver: "#9a9a9a",
        bone: "#e8e4e0",
        ivory: "#f5f2ee",
        accent: "#c8b8a0",
      },
      fontFamily: {
        display: ["'PP Editorial New'", "Georgia", "serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "'SF Mono'", "monospace"],
      },
      letterSpacing: {
        widest: "0.2em",
        ultra: "0.35em",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out both",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "line-expand": "lineExpand 0.8s ease-out both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        lineExpand: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
