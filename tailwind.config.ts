import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#f5f7ff",
        neon: {
          DEFAULT: "#6ee7ff",
          pink: "#ff4fd8",
          green: "#8bffb0",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(110, 231, 255, 0.35), 0 0 30px rgba(110, 231, 255, 0.14)",
        card: "0 10px 50px rgba(0, 0, 0, 0.35)",
      },
      fontFamily: {
        sans: ["Inter", "Geist", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade": "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 55%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.85" },
        },
      },
      animation: {
        marquee: "marquee 24s linear infinite",
        pulseGlow: "pulseGlow 3.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
