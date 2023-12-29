// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    baseURL: "/frontend-tools/",
    head: {
      htmlAttrs: {
        lang: "en-US",
        // For algolia dark theme
        "data-theme": "dark",
      },
      link: [
        {
          rel: "icon",
          href: "/frontend-tools/favicon.ico",
        },
      ],
      bodyAttrs: {
        class: "bg-base-700 font-poppins text-base-200",
      },
    },
  },
  css: ["@/assets/css/main.css", "@/assets/css/tailwind.css"],
  modules: [
    "@vueuse/nuxt",
    "@nuxt/content",
    "@nuxtjs/google-fonts",
    "@nuxtjs/algolia",
  ],
  typescript: {
    shim: false,
    strict: false,
  },
  content: {
    highlight: {
      theme: "dark-plus",
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      "postcss-preset-env": {},
      autoprefixer: {},
    },
  },
  googleFonts: {
    preload: true,
    download: false,
    families: {
      Poppins: {
        wght: [400, 500, 600],
      },
    },
  },
  algolia: {
    apiKey: "a753fe26210f0d0a7b0508fa1dca926b",
    applicationId: "9ZUSJ4EJ0L",
    docSearch: {
      indexName: "frontend-tools",
    },
  },
  experimental: {
    typedPages: true,
  },
  nitro: {
    preset: "github-pages",
  },
})
