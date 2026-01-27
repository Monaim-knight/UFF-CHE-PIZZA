import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1.5rem"
    },
    extend: {
      colors: {
        brand: {
          50: "#fdf5f2",
          100: "#fae5db",
          200: "#f4c6b1",
          300: "#eda685",
          400: "#e68559",
          500: "#dd6630",
          600: "#c44f1f",
          700: "#9b3d19",
          800: "#723013",
          900: "#49200c",
          950: "#2f1508"
        },
        accent: {
          50: "#f4f7f4",
          100: "#dde7de",
          200: "#bccfbe",
          300: "#9ab79d",
          400: "#789f7d",
          500: "#5f8663",
          600: "#4b684d",
          700: "#374a38",
          800: "#243024",
          900: "#141b14"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"]
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem"
      },
      boxShadow: {
        card: "0 18px 45px rgba(15, 23, 42, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;

