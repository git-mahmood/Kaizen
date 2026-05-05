import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#06060A",
        obsidian: "#0D0D14",
        surface: "#12121C",
        surface2: "#1A1A2E",
        neon: {
          blue: "#00D4FF",
          "blue-dim": "#0099BB",
          magenta: "#FF006E",
          "magenta-dim": "#CC0055",
        },
        ice: "#F0F0F8",
        muted: "#6B6B8A",
        border: "#1E1E35",
      },
      fontFamily: {
        display: ["Orbitron", "monospace"],
        ui: ["Rajdhani", "sans-serif"],
        mono: ["Share Tech Mono", "monospace"],
      },
      animation: {
        scan: "scan 3s linear infinite",
        glitch: "glitch .2s steps(2) infinite",
        "fade-up": "fadeUp .6s cubic-bezier(.16,1,.3,1) both",
        "slide-right": "slideRight .7s cubic-bezier(.16,1,.3,1) both",
      },
      keyframes: {
        scan: {
          "0%": { top: "0" },
          "100%": { top: "100%" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "25%": { transform: "translate(-2px, 1px)" },
          "50%": { transform: "translate(2px, -1px)" },
          "75%": { transform: "translate(-1px, 2px)" },
          "100%": { transform: "translate(0)" },
        },
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
      },
      backgroundSize: {
        "cyber-grid": "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
