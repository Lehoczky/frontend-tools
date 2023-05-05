<template>
  <div
    class="notification fixed right-7 top-20 grid grid-cols-[min-content_auto] gap-x-9 gap-y-2 rounded-md py-2.5 pl-4 pr-10 text-sm"
  >
    <IconCheckCircle class="row-span-2 self-center text-green-500" />
    <div class="tracking-wide">Timer finished!</div>
    <button
      class="transition-color justify-self-end rounded-md px-2 py-1 ease-out hover:bg-base-400 active:scale-95"
      @click="emit('ok')"
    >
      OK
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: "ok"): void
}>()
</script>

<style scoped>
.notification {
  background: linear-gradient(
    to right,
    theme("colors.green.700") -10%,
    theme("colors.base.500") 40%
  );
}
</style>
