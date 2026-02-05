import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./src/**/*.{js,jsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f8fb",
          100: "#eef1f6",
          200: "#d9dfea",
          300: "#bcc6d9",
          400: "#94a3be",
          500: "#6f82a2",
          600: "#556785",
          700: "#425168",
          800: "#2e374a",
          900: "#1c2230",
        },
        accent: {
          400: "#7c6cff",
          500: "#5b4df5",
          600: "#4336db",
        },
        glass: "rgba(255, 255, 255, 0.08)",
      },
      boxShadow: {
        "glass": "0 0 0 1px rgba(255, 255, 255, 0.06), 0 24px 60px -40px rgba(15, 23, 42, 0.45)",
        "glow": "0 0 40px rgba(124, 108, 255, 0.35)",
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at 10% 10%, rgba(124,108,255,0.35), transparent 45%), radial-gradient(circle at 90% 20%, rgba(56,189,248,0.25), transparent 40%)",
        "mesh": "radial-gradient(circle at 20% 20%, rgba(94,234,212,0.25), transparent 35%), radial-gradient(circle at 80% 10%, rgba(124,108,255,0.2), transparent 40%), radial-gradient(circle at 80% 90%, rgba(248,113,113,0.25), transparent 35%)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 4s ease infinite",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

export default config;
