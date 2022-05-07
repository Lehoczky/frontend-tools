module.exports = {
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
    },
  },
  corePlugins: {
    fontSize: false,
  },
  plugins: [require("tailwindcss-fluid-type")],
}
