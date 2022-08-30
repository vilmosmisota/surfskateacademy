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
      orange400: "#facc15",
      orange100: "#fef9c3",
      beige: "#FFEDD5",
      green: "#BFFD47",
      red: "#FD8547",
      black: "#000",
      transparent: "#ffffff00",
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
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("@tailwindcss/forms"),
  ],
};
