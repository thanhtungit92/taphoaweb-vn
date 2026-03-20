import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        portal: {
          50: "#f4f8ff",
          100: "#e9f2ff",
          200: "#c8defb",
          300: "#9fc5f6",
          500: "#2d6ecf",
          600: "#2458a6",
          700: "#1b447f",
          900: "#142842"
        }
      },
      boxShadow: {
        card: "0 14px 34px -18px rgba(20, 40, 66, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;
