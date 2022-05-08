<template>
  <article class="p-article">
    <h2 class="mb-article-heading text-3xl">Fluid CSS calculator</h2>
    <div class="grid grid-cols-[auto_1fr] items-center gap-7">
      <div class="text-2xl">Units:</div>
      <div class="col-span-2 sm:col-span-1">
        <RadioGroup id="fluid-css-unit" v-model="unit" class="flex gap-5">
          <RadioButton value="rem">REM</RadioButton>
          <RadioButton value="px">PX</RadioButton>
        </RadioGroup>
      </div>

      <div class="text-2xl">Range:</div>
      <div
        class="col-span-2 flex items-center gap-2 text-xl sm:col-span-1 sm:gap-5"
      >
        <div>from</div>
        <Input v-model="minValue" class="max-w-[9rem]" type="text" number />
        <div>to</div>
        <Input v-model="maxValue" class="max-w-[9rem]" type="text" number />
        <div>{{ unit }}</div>
      </div>

      <div class="text-2xl">Viewport:</div>
      <div
        class="col-span-2 flex items-center gap-2 text-xl sm:col-span-1 sm:gap-5"
      >
        <div>from</div>
        <Input v-model="minViewport" class="max-w-[9rem]" type="text" number />
        <div>to</div>
        <Input v-model="maxViewport" class="max-w-[9rem]" type="text" number />
        <div>{{ unit }}</div>
      </div>
    </div>

    <div
      class="relative mt-5 rounded-sm bg-base-800 py-5 pl-5 pr-14 text-white"
    >
      <code>{{ css }}</code>

      <button class="absolute right-5 top-5 active:scale-95" @click="copy()">
        <IconCopy />
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { round } from "lodash-es"

import { toPX, toREMWithFixedPrecision } from "~~/utils"

const unit = ref<"rem" | "px">("rem")
const minValue = ref(1)
const maxValue = ref(1.5)
const minViewport = ref(40)
const maxViewport = ref(120)

const minValueInREM = computed(() =>
  unit.value === "rem"
    ? minValue.value
    : toREMWithFixedPrecision(minValue.value)
)
const valueDifference = computed(() => maxValue.value - minValue.value)
const viewportDifference = computed(() => maxViewport.value - minViewport.value)

/**
 * calculation = calc(ZZ + ((1vw - XX) * YY))
 * Where  XX = min_viewport / 100
 *        YY = 100 * (max_font_size - min_font_size) / (max_viewport - min_viewport)
 *           = 100 * font_size_difference / viewport_difference
 *        ZZ = Minimum font-size stated in REM
 *
 * @see {@link https://websemantics.uk/tools/responsive-font-calculator/}
 */
const css = computed(() => {
  const XX = minViewport.value / 100
  const YY = round((100 * valueDifference.value) / viewportDifference.value, 4)
  const ZZ = minValueInREM.value
  const fluidCalculation = `calc(${ZZ}rem + ((1vw - ${XX}${unit.value}) * ${YY}))`
  return `clamp(${minValue.value}${unit.value}, ${fluidCalculation}, ${maxValue.value}${unit.value})`
})

const { copy } = useClipboard({ source: css })

watch(unit, (newValue) => {
  if (newValue === "px") {
    minValue.value = toPX(minValue.value)
    maxValue.value = toPX(maxValue.value)
    minViewport.value = toPX(minViewport.value)
    maxViewport.value = toPX(maxViewport.value)
  } else if (newValue === "rem") {
    minValue.value = toREMWithFixedPrecision(minValue.value)
    maxValue.value = toREMWithFixedPrecision(maxValue.value)
    minViewport.value = toREMWithFixedPrecision(minViewport.value)
    maxViewport.value = toREMWithFixedPrecision(maxViewport.value)
  }
})
</script>
