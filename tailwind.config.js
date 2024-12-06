/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        darkgreen: "#466f65",
        beige: {
          light: "#f6f6f6",
          dark: "#ededed",
        },
        primary: {
          dark: "#11253e",
          light: "#22364f",
        },
      },
      screens: {
        "5sm": "100px",
        "4sm": "200px",
        "3sm": "300px",
        "2sm": "400px",
        "3xl": "2000px",
        "4xl": "2500px",
        "5xl": "3000px",
        "6xl": "3500px",
      },
      fontFamily: {
        brand: ["HelveticaNeue", "sans-serif"],
      },
      fontWeight: {
        ultraLight: "100",
        thin: "200",
        light: "300",
        normal: "400",
        medium: "500",
        bold: "700",
        heavy: "800",
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        marquee2: "marquee2 35s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
