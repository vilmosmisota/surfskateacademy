/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      light: "#F5F5F5",
      dark: "#0f172a",
      lightBlue: "#E2E8F0",
      darkBlue: "#475569",
      orange: "#FDE047",
      green: "#BFFD47",
      red: "#FD8547",
      black: "#000",
    },
    fontFamily: {
      sans: "'Raleway', sans-serif",
      sansBody: "'Roboto', sans-serif",
    },
    extend: {
      boxShadow: {
        DEFAULT: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
