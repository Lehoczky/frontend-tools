<template>
  <Header />
  <main class="mx-auto mt-5 w-[95%] max-w-4xl px-2 sm:w-11/12 md:mt-11">
    <slot />
  </main>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    if (titleChunk === "Frontend Tools") {
      return ""
    }
    return `${titleChunk} - Frontend Tools`
  },
})
</script>
