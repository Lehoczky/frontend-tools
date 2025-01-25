<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h1
    :id="id"
    class="group mb-8 scroll-mt-24 text-5xl font-semibold tracking-tight"
  >
    <NuxtLink :to="`#${id}`">
      <slot />
      <IconAnchor
        class="ml-3 hidden text-3xl opacity-0 transition-opacity group-hover:opacity-100 sm:inline-block"
      />
    </NuxtLink>
  </h1>
</template>
