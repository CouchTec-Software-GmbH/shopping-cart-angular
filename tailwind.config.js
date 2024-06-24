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
    },
  },
  plugins: [],
};
