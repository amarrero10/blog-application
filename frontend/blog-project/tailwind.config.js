/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        offWhite: "#ECEFED",
        khaki: "#8B826C",
        warmGray: "#93948F",
        siennaBrown: "#7C5F51",
        charcoal: "#343633",
      },
    },
  },
  plugins: [],
};
