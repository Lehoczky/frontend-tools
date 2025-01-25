<script setup lang="ts">
defineProps({
  countingDown: {
    type: Boolean,
    default: false,
  },
  startDisabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (event: "update:countingDown", value: boolean): void
}>()
</script>

<template>
  <div class="relative h-14 sm:w-28">
    <Transition name="slide-up">
      <Button
        v-if="!countingDown"
        class="absolute w-full justify-center !p-4 will-change-transform sm:h-full sm:px-6 sm:py-4"
        color="blue"
        :disabled="startDisabled"
        aria-label="Start"
        @click="emit('update:countingDown', true)"
      >
        <span class="text-2xl sm:text-lg">Start</span>
        <IconPlay class="h-9 w-9 sm:h-5 sm:w-5" />
      </Button>

      <Button
        v-else
        class="absolute w-full justify-center !p-4 will-change-transform sm:h-full sm:px-6 sm:py-4"
        color="red"
        aria-label="Pause"
        @click="emit('update:countingDown', false)"
      >
        <span class="text-2xl sm:text-base">Pause</span>
        <IconPause class="h-9 w-9 sm:h-5 sm:w-5" />
      </Button>
    </Transition>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  @apply transition duration-250 ease-out;
}

.slide-up-enter-from {
  @apply translate-y-5 opacity-0;
}

.slide-up-leave-to {
  @apply -translate-y-5 opacity-0;
}
</style>
