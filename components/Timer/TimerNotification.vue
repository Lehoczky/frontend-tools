<script setup lang="ts">
const emit = defineEmits<{
  (event: "ok"): void
}>()
</script>

<template>
  <div
    class="fixed right-7 top-20 grid grid-cols-[min-content_auto] gap-x-9 gap-y-4 rounded-lg border-l-4 border-green-700 bg-base-500 py-4 pl-5 pr-10"
  >
    <IconCheckCircle class="row-span-2 self-center text-green-500" />
    <div class="tracking-wide">Timer finished!</div>
    <button
      class="transition-color justify-self-end rounded-md px-4 py-1 text-lg ease-out hover:bg-base-400 active:scale-95"
      @click="emit('ok')"
    >
      OK
    </button>
  </div>
</template>
