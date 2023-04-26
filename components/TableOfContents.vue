<template>
  <ul v-if="value.links" class="grid grid-cols-2 gap-1">
    <li v-for="link in value.links" :key="link.text">
      <a :href="`#${link.id}`">
        {{ link.text }}
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Toc } from "@nuxt/content/dist/runtime/types"

defineProps({
  value: {
    type: Object as PropType<Toc>,
    required: true,
  },
})
</script>
