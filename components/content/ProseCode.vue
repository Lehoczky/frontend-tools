<template>
  <div
    class="my-6 w-full overflow-hidden rounded-lg border border-zinc-900 bg-zinc-900 text-sm"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { Lang } from "shiki-es"
import type { PropType } from "vue"

defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String as PropType<Lang>,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
})
</script>

<style scoped>
:deep(pre) {
  @apply m-0 flex overflow-x-auto p-4 leading-relaxed;
}

:deep(code) {
  @apply flex w-full flex-col pr-7;
}

:deep(.line) {
  @apply inline-table min-h-[1rem];
}
</style>
