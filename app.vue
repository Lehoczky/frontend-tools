<template>
  <div>
    <LoadingIndicator />
    <Header />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const PAGE_TITLE = "Frontend Tools"

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${PAGE_TITLE}` : PAGE_TITLE
  },
})

defineRobotMeta()
</script>
