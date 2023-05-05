<template>
  <div class="relative h-10">
    <Transition name="slide-up">
      <Button
        v-if="!countingDown"
        class="absolute will-change-transform"
        color="blue"
        :disabled="startDisabled"
        @click="emit('update:countingDown', true)"
      >
        Start
        <IconPlay />
      </Button>

      <Button
        v-else
        class="absolute will-change-transform"
        color="red"
        @click="emit('update:countingDown', false)"
      >
        Pause
        <IconPause />
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
