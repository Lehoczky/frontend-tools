<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h2
    :id="id"
    class="group mb-5 mt-12 scroll-mt-20 border-t border-base-500 pt-6 text-3xl font-semibold tracking-tighter"
  >
    <NuxtLink :to="`#${id}`">
      <slot />
      <IconAnchor
        class="ml-3 hidden text-xl opacity-0 transition-opacity group-hover:opacity-100 sm:inline-block"
      />
    </NuxtLink>
  </h2>
</template>
