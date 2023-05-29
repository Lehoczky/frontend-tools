<template>
  <div class="my-4 rounded-lg border border-base-400 bg-base-600 p-4">
    <div
      class="summary cursor-pointer"
      @click="isOpen = !isOpen"
      @mousedown="preventTextSelectionOnDbClick"
    >
      <div class="inline-block pl-1">
        <div
          class="mr-2.5 inline-block h-0 w-0 transform border-y-6 border-l-8 border-y-transparent border-l-current transition-transform duration-200"
          :class="{
            'rotate-90': isOpen,
          }"
        />
        <slot name="summary" />
      </div>
    </div>

    <div
      class="grid transition-[grid-template-rows] duration-500 motion-reduce:transition-none"
      :class="{
        'grid-rows-[1fr]': isOpen,
        'grid-rows-[0fr]': !isOpen,
      }"
    >
      <div
        class="overflow-hidden transition-opacity duration-300 motion-reduce:transition-none"
        :class="{
          'opacity-100': isOpen,
          'opacity-0': !isOpen,
        }"
      >
        <div class="mt-4 border-t border-base-400 pt-4">
          <slot name="content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

function preventTextSelectionOnDbClick(event: MouseEvent) {
  if (event.detail > 1) {
    event.preventDefault()
  }
}
</script>

<style scoped>
:deep(.summary p) {
  @apply m-0 inline-block;
}
</style>
