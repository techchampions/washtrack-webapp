/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        screens: {
          xs: "480px",
        },
        colors: {
          brand: "#00BCFF",
        },
        custom: ["Hellix", "san-serif"],
      },
    },
    plugins: [require("tailwind-scrollbar")],
  };