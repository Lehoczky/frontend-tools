<template>
  <article class="p-article">
    <h2 class="mb-article-heading text-3xl">PX to REM converter</h2>

    <div
      class="grid place-content-start place-items-center gap-5 sm:grid-flow-col"
    >
      <NumberInput
        :model-value="px"
        class="text-4xl"
        suffix="px"
        @update:model-value="handlePXInput($event)"
      />
      <IconArrowSwitch class="rotate-90 text-gray-500 sm:rotate-0" />
      <NumberInput
        :model-value="rem"
        class="text-4xl"
        suffix="rem"
        @update:model-value="handleREMInput($event)"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { toPX, toREMWithFixedPrecision } from "~~/utils"

const px = ref<number>()
const rem = ref<number>()

const handlePXInput = (value: number) => {
  px.value = value
  rem.value = value === undefined ? undefined : toREMWithFixedPrecision(value)
}

const handleREMInput = (value: number) => {
  rem.value = value
  px.value = value === undefined ? undefined : toPX(value)
}
</script>
