<template>
  <main class="mx-auto mt-24 w-[95%] max-w-4xl sm:w-11/12">
    <h1 class="mb-2 text-5xl">{{ error.statusCode }}</h1>
    <NuxtLink to="/">Back to the home page</NuxtLink>
  </main>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app"

const props = defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    default: () => ({}),
  },
})

useHead({
  title: computed(() => {
    return `${props.error.statusCode} - Frontend Tools`
  }),
})
</script>
