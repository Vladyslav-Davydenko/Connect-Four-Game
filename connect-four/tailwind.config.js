/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-primary": "var(--dark-primary-color)",
        "super-dark-primary": "var(--super-dark-primary-color)",
        "light-primary": "var(--light-primary-color)",
        primary: "var(--primary-color)",
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
        appear_left: {
          from: { transform: "translate(3rem, 0)", opacity: "0" },
          to: { transform: "translate(0, 0)", opacity: "1" },
        },
        appear_right: {
          from: { transform: "translate(-3rem, 0)", opacity: "0" },
          to: { transform: "translate(0, 0)", opacity: "1" },
        },
        drop_down: {
          "0%": { transform: "translate(0, -30rem)", opacity: "0" },
          "100%": { transform: "translate(0, 0)", opacity: "1" },
        },
        bg_fade_in: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        wiggle: "wiggle 2s ease-in-out infinite",
        appear_1: "appear 1s ease-in-out 0.25s",
        appear_2: "appear 1s ease-in-out 0.5s",
        appear_3: "appear 1s ease-in-out 0.75s",
        appear_4: "appear 1s ease-in-out 1s",
        appear_left_1: "appear_left 1s ease-in-out 0.25s",
        appear_right_1: "appear_right 1s ease-in-out 0.5s",
        appear_left_2: "appear_left 1s ease-in-out 0.75s",
        appear_right_2: "appear_right 1s ease-in-out 1s",
        drop_down: "drop_down 700ms ease-in-out",
        bg_fade_in: "bg_fade_in 700ms ease-in-out",
      },
      boxShadow: {
        "inner-slot": "0px 22px 46px -8px rgba(0,0,0,0.55) inset",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
