/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./composables/**/*.{js,ts}",
    "./plugins/**/*.{js,ts}",
    "./App.{js,ts,vue}",
    "./app.{js,ts,vue}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          300: "#cbcac8",
          400: "#3b404d",
          500: "#2e323b",
          600: "#282c34",
          700: "#21252b",
          800: "#1b1f23",
        },
        code: {
          blue: "#56b6c2",
          purple: "#c678dd",
          yellow: "#d19a66",
          red: "#e06c75",
          natural: "#abb2bf",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      padding: {
        article: "clamp(1.25rem, -0.1786rem + 3.5714vw, 3.25rem)",
      },
      margin: {
        "article-heading": "clamp(1rem, 0.1071rem + 2.2321vw, 2.25rem)",
      },
      boxShadow: {
        header: "0 0 10px 0 #00000029",
      },
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  corePlugins: {
    fontSize: false,
  },
  plugins: [require("tailwindcss-fluid-type")],
}
