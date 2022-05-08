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
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      padding: {
        article:
          "clamp(1.25rem, calc(1.25rem + ((1vw - 0.4rem) * 3.5714)), 3.25rem)",
      },
      margin: {
        "article-heading":
          "clamp(1rem, calc(1rem + ((1vw - 0.4rem) * 2.2321)), 2.25rem)",
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
