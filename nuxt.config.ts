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
        class: "bg-base-700 font-poppins text-base-300",
      },
    },
  },
  extends: ["@nuxt-themes/elements", "@nuxt-themes/typography"],
  css: ["@/assets/css/main.css", "@/assets/css/tailwind.css"],
  modules: ["@vueuse/nuxt", "@nuxt/content", "@nuxtjs/google-fonts"],
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
    families: {
      Poppins: {
        wght: [400, 500, 600],
      },
    },
  },
})
