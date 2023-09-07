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
    "nuxt-simple-robots",
    "nuxt-simple-sitemap",
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
    apiKey: process.env.ALGOLIA_API_KEY ?? "<MISSING-API-KEY>",
    applicationId: process.env.ALGOLIA_APPLICATION_ID ?? "<MISSING-APP-ID>",
    docSearch: {
      searchParameters: {
        facetFilters: ["lang:en-US"],
      },
      indexName: "frontend-tools",
    },
  },
  robots: {
    siteUrl: "https://lehoczky.github.io/frontend-tools/",
  },
  sitemap: {
    siteUrl: "https://lehoczky.github.io/frontend-tools/",
  },
  experimental: {
    typedPages: true,
    watcher: "chokidar",
  },
  nitro: {
    preset: "github-pages",
  },
})
