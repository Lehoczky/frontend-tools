<template>
  <article class="p-article">
    <h2 class="mb-article-heading text-3xl">PX to REM converter</h2>

    <div
      class="grid place-content-start place-items-center gap-5 sm:grid-flow-col"
    >
      <NumberInput
        :model-value="leftInput"
        class="text-4xl"
        :suffix="showPXInLeftInput ? 'px' : 'rem'"
        @update:model-value="updateLeftInput($event)"
      />

      <button
        class="rounded-full p-1.5 transition-transform duration-200 will-change-transform hover:rotate-180 hover:bg-base-500 focus:bg-base-500 active:!rotate-0 active:scale-95 active:!duration-0"
        aria-label="Switch values"
        @click="switchValues"
      >
        <IconArrowSwitch class="rotate-90 text-gray-500 sm:rotate-0" />
      </button>

      <NumberInput
        :model-value="rightInput"
        class="text-4xl"
        :suffix="showPXInLeftInput ? 'rem' : 'px'"
        @update:model-value="updateRightInput($event)"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { toPX, toREMWithFixedPrecision } from "~~/utils"

const leftInput = ref<number>()
const rightInput = ref<number>()
const showPXInLeftInput = ref(true)

const updateLeftInput = (value: number) => {
  leftInput.value = value

  const converter = showPXInLeftInput.value ? toREMWithFixedPrecision : toPX
  rightInput.value = value === undefined ? undefined : converter(value)
}

const updateRightInput = (value: number) => {
  rightInput.value = value

  const converter = showPXInLeftInput.value ? toPX : toREMWithFixedPrecision
  leftInput.value = value === undefined ? undefined : converter(value)
}

const switchValues = () => {
  showPXInLeftInput.value = !showPXInLeftInput.value
  updateLeftInput(leftInput.value)
}
</script>
