import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */

import twColors from "tailwindcss/colors";

const colors = {
  transparent: twColors.transparent,
  black: twColors.black,
  white: twColors.white,
  primary: "#3caf2c",
  secondary: "#757575",
  accent: "#4160b1",
  gray: '#191919',
  "bg-color": "#151212",
  "bg-color-alt": "#120c0d",
};

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors,
    screens: {
      lg: "1100px",
      "960": "960px",
      md: "820px",
      sm: "500px",
      xs: "400px",
    },
    extend: {
      fontSize: {
        xs: "0.82rem",
        sm: "0.98rem",
        base: "1.15rem",
        lg: "1.22rem",
        xl: "1.36rem",
        "1.5xl": "1.5rem",
        "2xl": "1.725rem",
        "3xl": "2.155rem",
        "4xl": "2.58rem",
        "5xl": "3.45rem",
        "6xl": "4.3rem",
        "7xl": "5.17rem",
        "8xl": "6.9rem",
        "9xl": "9.2rem",
      },
      keyFrames: {
        animationOpacity: {
          from: { opacity: 0.2 },
          to: { opacity: 1 },
        },
        scaleIn: {
          "0%": {
            opacity: 0,
            transform: "scale(0.9)",
          },
          "50%": {
            opacity: 0.3,
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
      },
      animation: {
        opacity: "animationOpacity .5s ease-in-out",
        scaleIn: "scaleIn .35s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
