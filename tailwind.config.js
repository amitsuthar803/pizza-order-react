/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      // to use everywhere in entire page
      sans: "Roboto Mono, monospace",
    },

    // extends do is keeping everyting from tailwind but simply extending it
    extend: {
      fontSize: {
        huge: ["10rem", { lineHeight: "1" }],
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
