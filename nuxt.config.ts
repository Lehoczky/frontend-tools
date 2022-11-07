// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: "/frontend-tools/",
    head: {
      link: [
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
    },
  },
  css: ["@/assets/css/tailwind.css"],
  modules: ["@vueuse/nuxt"],
  typescript: {
    shim: false,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
