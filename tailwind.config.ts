import { Rajdhani } from 'next/font/google';
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm:'648px',
      md:'768px',
      lg:'960px',
      xl:'1440px',
    },
    fontFamily:{
      rajdhani:'var(--font-rajdhani)',
    },
    extend: {
      colors:{
        primary: {
          DEFAULT: '#222222',
          hover: '#2f2f2f',
        },
        accent: {
          DEFAULT: '#ed1d24',
          hover: '#d60001c',
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config