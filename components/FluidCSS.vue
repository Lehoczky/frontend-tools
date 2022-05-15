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
        <NumberInput v-model="minValue" class="max-w-[9rem]" />
        <div>to</div>
        <NumberInput v-model="maxValue" class="max-w-[9rem]" />
        <div>{{ unit }}</div>
      </div>

      <div class="text-2xl">Viewport:</div>
      <div
        class="col-span-2 flex items-center gap-2 text-xl sm:col-span-1 sm:gap-5"
      >
        <div>from</div>
        <NumberInput v-model="minViewport" class="max-w-[9rem]" />
        <div>to</div>
        <NumberInput v-model="maxViewport" class="max-w-[9rem]" />
        <div>{{ unit }}</div>
      </div>
    </div>

    <div
      class="relative mt-5 min-h-[4rem] rounded-sm bg-base-800 py-5 pl-5 pr-14 text-white"
    >
      <code class="leading-none">
        <template v-if="!hideCSS">
          <span class="text-[#56b6c2]">clamp</span
          ><span class="text-[#c678dd]">(</span
          ><span class="text-[#d19a66]">{{ minValue }}</span
          ><span class="text-[#e06c75]">{{ unit }}</span
          ><span class="text-[#abb2bf]">, </span
          ><span class="text-[#56b6c2]">calc(</span
          ><span class="text-[#d19a66]">{{ z }}</span
          ><span class="text-[#e06c75]">rem</span
          ><span class="text-[#56b6c2]"> + </span
          ><span class="text-[#d19a66]">(</span
          ><span class="text-[#c678dd]">(</span
          ><span class="text-[#d19a66]">1</span
          ><span class="text-[#e06c75]">vw</span
          ><span class="text-[#56b6c2]"> - </span
          ><span class="text-[#d19a66]">{{ x }}</span
          ><span class="text-[#e06c75]">{{ unit }}</span
          ><span class="text-[#c678dd]">)</span
          ><span class="text-[#56b6c2]"> * </span
          ><span class="text-[#d19a66]">{{ y }}</span
          ><span class="text-[#d19a66]">)</span
          ><span class="text-[#56b6c2]">)</span
          ><span class="text-[#abb2bf]">, </span
          ><span class="text-[#d19a66]">{{ maxValue }}</span
          ><span class="text-[#e06c75]">{{ unit }}</span
          ><span class="text-[#c678dd]">)</span>
        </template>
      </code>

      <button
        class="absolute right-5 top-5 text-[#abb2bf] hover:text-white active:scale-90"
        aria-label="Copy CSS"
        @click="copy()"
      >
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

const valueDifference = computed(() => maxValue.value - minValue.value)
const viewportDifference = computed(() => maxViewport.value - minViewport.value)
const hideCSS = computed(
  () => isNaN(valueDifference.value) || isNaN(viewportDifference.value)
)

const x = computed(() => round(minViewport.value / 100, 4))
const y = computed(() =>
  round((100 * valueDifference.value) / viewportDifference.value, 4)
)
const z = computed(() =>
  unit.value === "rem"
    ? minValue.value
    : toREMWithFixedPrecision(minValue.value)
)

/**
 * calculation = calc(z + ((1vw - x) * y))
 *
 * Where  x = min_viewport / 100
 *        y = 100 * (max_font_size - min_font_size) / (max_viewport - min_viewport)
 *           = 100 * font_size_difference / viewport_difference
 *        z = Minimum font-size stated in REM
 *
 * @see {@link https://websemantics.uk/tools/responsive-font-calculator/}
 */
const css = computed(() => {
  if (hideCSS.value) {
    return ""
  }
  const fluidCalculation = `calc(${z.value}rem + ((1vw - ${x.value}${unit.value}) * ${y.value}))`
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
