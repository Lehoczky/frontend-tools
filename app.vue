<template>
  <Header />

  <main class="mx-auto w-[95%] max-w-4xl sm:w-11/12">
    <PxToRemConverter />
    <FluidCSS />
    <LunchTime />
    <Timer />
  </main>
</template>

<script setup>
useHead({
  title: "Frontend Tools",
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
})
</script>
