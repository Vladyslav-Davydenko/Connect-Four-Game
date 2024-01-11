/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#363062",
        blue: "#435585",
        "light-blue": "#818fb4",
        white: "#f5e8c7",
      },
    },
  },
  plugins: [],
};
