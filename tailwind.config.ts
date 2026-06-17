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
        pink: {
          DEFAULT: "#E8A0BF",
          light: "#F5D0E4",
          dark: "#C9739A",
        },
        purple: {
          DEFAULT: "#9B5DE5",
          light: "#C49CF0",
          dark: "#7A3DB8",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      spacing: {
        "grid": "8px",
      },
    },
  },
  plugins: [],
};
export default config;
