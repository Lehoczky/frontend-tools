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
          href: "/favicon.ico",
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap",
        },
      ],
      bodyAttrs: {
        class: "bg-base-700 font-poppins text-base-300",
      },
    },
  },
  css: ["@/assets/css/main.css", "@/assets/css/tailwind.css"],
  modules: ["@vueuse/nuxt", "@nuxt/content"],
  typescript: {
    shim: false,
    strict: false,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
