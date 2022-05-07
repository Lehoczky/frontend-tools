<template>
  <article>
    <h2>PX to REM converter</h2>

    <div class="grid place-items-center gap-5 sm:grid-flow-col">
      <Input
        :model-value="px"
        type="text"
        suffix="px"
        number
        @update:model-value="handlePXInput($event)"
      />
      <IconArrowSwitch class="rotate-90 text-gray-500 sm:rotate-0" />
      <Input
        :model-value="rem"
        type="text"
        suffix="rem"
        number
        @update:model-value="handleREMInput($event)"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { toFixedPrecision } from "~~/utils"

const px = ref<number>()
const rem = ref<number>()

const handlePXInput = (value: string) => {
  rem.value = value ? toFixedPrecision(Number(value) / 16) : undefined
}

const handleREMInput = (value: string) => {
  px.value = value ? Number(value) * 16 : undefined
}
</script>
