<script setup lang="ts">
const PAGE_TITLE = "Frontend Tools"

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${PAGE_TITLE}` : PAGE_TITLE
  },
})
useSeoMeta({
  description: "Collection of utilities to make frontend development easier.",
})
</script>

<template>
  <div>
    <LoadingIndicator />
    <Header />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
