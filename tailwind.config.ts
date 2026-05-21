import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./systems/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        bebas: ["var(--font-bebas)", "system-ui", "sans-serif"],
      },
      colors: {
        oni: {
          accent: "#FF4A1A",
        },
      },
      // ─── MaxWidth tokens ───────────────────────────────────────────────────
      // Named section content widths. Use these instead of arbitrary max-w-[Npx].
      // oni-page     → main page content (WorkSection)
      // oni-showreel → showreel content container
      // oni-contact  → contact / footer content
      maxWidth: {
        "oni-page": "1500px",
        "oni-showreel": "1100px",
        "oni-contact": "1400px",
      },
    },
  },
  plugins: [],
};

export default config;
