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
      },
      screens: {
        '5sm': '100px',
        '4sm': '200px',
        '3sm': '300px',
        '2sm': '400px',
        '3xl': '2000px',
        '4xl': '2500px',
        '5xl': '3000px',
        '6xl': '3500px'
      }
    },
  },
  plugins: [],
};
