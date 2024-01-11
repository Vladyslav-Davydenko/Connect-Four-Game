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
        yellow: "#FF9800",
        red: "#B80000",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        appear: {
          from: { transform: "translate(0, 3rem)", opacity: "0" },
          to: { transform: "translate(0, 0)", opacity: "1" },
        },
      },
      animation: {
        wiggle: "wiggle 2s ease-in-out infinite",
        appear_1: "appear 1s ease-in-out 0.25s",
        appear_2: "appear 1s ease-in-out 0.5s",
        appear_3: "appear 1s ease-in-out 0.75s",
        appear_4: "appear 1s ease-in-out 1s",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
