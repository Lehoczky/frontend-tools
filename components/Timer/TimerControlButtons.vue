<template>
  <div class="relative h-12 w-12">
    <Transition name="slide-up">
      <Button
        v-if="!countingDown"
        class="absolute !p-3 will-change-transform sm:px-6 sm:py-4"
        color="blue"
        :disabled="startDisabled"
        aria-label="Start"
        @click="emit('update:countingDown', true)"
      >
        <span class="hidden sm:inline">Start</span>
        <IconPlay class="h-9 w-9 sm:h-5 sm:w-5" />
      </Button>

      <Button
        v-else
        class="absolute !p-3 will-change-transform sm:px-6 sm:py-4"
        color="red"
        aria-label="Pause"
        @click="emit('update:countingDown', false)"
      >
        <span class="hidden sm:inline">Pause</span>
        <IconPause class="h-9 w-9 sm:h-5 sm:w-5" />
      </Button>
    </Transition>
  </div>
</template>

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

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  @apply transition duration-250 ease-out;
}

.slide-up-enter-from {
  @apply translate-y-7 opacity-0;
}

.slide-up-leave-to {
  @apply -translate-y-7 opacity-0;
}
</style>
