import type { Config } from "tailwindcss";

const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        nav: "1360px",
      },
      colors: {
        gold: {
          DEFAULT: v("accent"),
          light: v("accent-light"),
          dark: v("accent-dark"),
          pale: v("accent-pale"),
        },
        "on-accent": v("on-accent"),
        luxury: {
          black: v("bg"),
          dark: v("bg-2"),
          card: v("card"),
          card2: v("card-2"),
          border: v("border"),
          text: v("text"),
          muted: v("muted"),
          subtle: v("subtle"),
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        brand: ["var(--font-brand)", "var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, rgb(var(--accent-dark)) 0%, rgb(var(--accent)) 35%, rgb(var(--accent-light)) 50%, rgb(var(--accent)) 65%, rgb(var(--accent-dark)) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
