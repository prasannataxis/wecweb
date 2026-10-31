import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C4A44A",
          light: "#CEAB5A",
          dark: "#9A7820",
          muted: "#6B5420",
          pale: "#E8D398",
        },
        luxury: {
          black: "#080808",
          dark: "#111111",
          card: "#161616",
          card2: "#1C1C1C",
          border: "#2A2520",
          text: "#F5F0E8",
          muted: "#9A9086",
          subtle: "#4A453E",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #9A7820 0%, #C4A44A 35%, #CEAB5A 50%, #C4A44A 65%, #9A7820 100%)",
        "gold-shimmer": "linear-gradient(90deg, #9A7820 0%, #C4A44A 25%, #CEAB5A 50%, #C4A44A 75%, #9A7820 100%)",
      },
      animation: {
        shimmer: "shimmer 4s linear infinite",
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
