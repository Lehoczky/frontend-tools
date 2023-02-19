<template>
  <Header />
  <main class="mx-auto w-[95%] max-w-4xl sm:w-11/12">
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
