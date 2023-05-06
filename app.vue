<template>
  <div>
    <LoadingIndicator />
    <Header v-model:menu-open="menuOpen" />
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
useSeoMeta({
  description: "Collection of utilities to make frontend development easier.",
})
defineRobotMeta()

const menuOpen = ref(false)
const body = ref()
const isLocked = useScrollLock(body)

onMounted(() => {
  body.value = document.querySelector("body")
})

watch(menuOpen, (isOpen) => {
  isLocked.value = isOpen
})
</script>
