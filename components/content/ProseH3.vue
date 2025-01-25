<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h3 :id="id" class="group mb-3 mt-8 scroll-mt-20 text-2xl font-semibold">
    <NuxtLink :to="`#${id}`">
      <slot />
      <IconAnchor
        class="ml-2 hidden text-lg opacity-0 transition-opacity group-hover:opacity-100 sm:inline-block"
      />
    </NuxtLink>
  </h3>
</template>
