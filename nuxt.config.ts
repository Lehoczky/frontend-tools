// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    baseURL: "/frontend-tools/",
    head: {
      htmlAttrs: {
        lang: "en-US",
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
  robots: {
    siteUrl: "https://lehoczky.github.io/frontend-tools/",
  },
  sitemap: {
    siteUrl: "https://lehoczky.github.io/frontend-tools/",
  },
})
