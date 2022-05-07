<template>
  <article class="p-article">
    <h2 class="mb-article-heading text-3xl">PX to REM converter</h2>

    <div
      class="grid place-content-start place-items-center gap-5 sm:grid-flow-col"
    >
      <Input
        :model-value="px"
        class="text-4xl"
        type="text"
        suffix="px"
        number
        @update:model-value="handlePXInput($event)"
      />
      <IconArrowSwitch class="rotate-90 text-gray-500 sm:rotate-0" />
      <Input
        :model-value="rem"
        class="text-4xl"
        type="text"
        suffix="rem"
        number
        @update:model-value="handleREMInput($event)"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { toPX, toREMWithFixedPrecision } from "~~/utils"

const px = ref<number>()
const rem = ref<number>()

const handlePXInput = (value: string) => {
  rem.value = value ? toREMWithFixedPrecision(value) : undefined
}

const handleREMInput = (value: string) => {
  px.value = value ? toPX(value) : undefined
}
</script>
