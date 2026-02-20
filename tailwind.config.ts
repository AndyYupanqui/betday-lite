import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#00FF87",
          dark: "#00CC6A",
          muted: "#00FF8720",
        },
        surface: {
          DEFAULT: "#0D0F1A",
          2: "#13162A",
          3: "#1A1F35",
          4: "#222844",
        },
        border: "#2A3050",
      },
      fontFamily: { sans: ["var(--font-inter)", "sans-serif"] },
      animation: {
        "pulse-once": "pulse 0.6s ease-in-out 1",
        "slide-up": "slideUp 0.4s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        "bounce-in": "bounceIn 0.5s cubic-bezier(0.36,0.07,0.19,0.97)",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
