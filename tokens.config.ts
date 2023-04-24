import { defineTheme } from "pinceau"

export default defineTheme({
  prose: {
    h1: {
      margin: "0 0 2rem",
    },
    h2: {
      fontSize: "{typography.fontSize.3xl}",
      margin: "1rem 0 2rem",
    },
    h3: {
      fontSize: "{typography.fontSize.2xl}",
      margin: "1rem 0 2rem",
    },
    h4: {
      fontSize: "{typography.fontSize.xl}",
      margin: "0.5rem 0 1rem",
    },
    h5: {
      fontSize: "{typography.fontSize.lg}",
      margin: "0.5rem 0 1rem",
    },
    li: {
      margin: "0.25rem 0",
    },
    p: {
      margin: "1rem 0",
      br: {
        margin: "1rem 0 0 0",
      },
    },
  },
})
