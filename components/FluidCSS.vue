<template>
  <article class="p-article">
    <h1 class="mb-article-heading text-3xl">Fluid CSS calculator</h1>
    <div class="grid grid-cols-[auto_1fr] items-center gap-2 sm:gap-7">
      <div class="text-2xl">Units:</div>
      <div class="col-span-2 mb-2.5 sm:col-span-1 sm:mb-0">
        <RadioGroup id="fluid-css-unit" v-model="unit" class="flex gap-5">
          <RadioButton value="rem">REM</RadioButton>
          <RadioButton value="px">PX</RadioButton>
        </RadioGroup>
      </div>

      <div class="text-2xl">Range:</div>
      <div
        class="col-span-2 mb-2.5 flex items-center gap-2 text-xl sm:col-span-1 sm:mb-0 sm:gap-5"
      >
        <div class="hidden sm:block">from</div>
        <IndexNumberInput v-model="minValue" class="max-w-[9rem]" />
        <div>to</div>
        <IndexNumberInput v-model="maxValue" class="max-w-[9rem]" />
        <div>{{ unit }}</div>
      </div>

      <div class="text-2xl">Viewport:</div>
      <div
        class="col-span-2 flex items-center gap-2 text-xl sm:col-span-1 sm:gap-5"
      >
        <div class="hidden sm:block">from</div>
        <IndexNumberInput v-model="minViewport" class="max-w-[9rem]" />
        <div>to</div>
        <IndexNumberInput v-model="maxViewport" class="max-w-[9rem]" />
        <div>{{ unit }}</div>
      </div>
    </div>

    <div
      class="relative mt-5 min-h-[4rem] rounded-sm bg-base-800 py-5 pl-5 pr-14"
    >
      <code class="leading-none">
        <template v-if="!hideCSS">
          <span class="text-code-blue">clamp</span
          ><span class="text-code-purple">(</span
          ><span class="text-code-yellow">{{ minInClamp }}</span
          ><span class="text-code-red">{{ unit }}</span
          ><span class="text-code-natural">, </span
          ><template v-if="showConstantPart"
            ><span class="text-code-yellow">{{ constantInCalc }}</span
            ><span class="text-code-red">{{ unit }}</span
            ><span class="text-code-blue"> + </span></template
          ><span class="text-code-yellow">{{ viewWidthInCalc }}</span
          ><span class="text-code-red">vw</span
          ><span class="text-code-natural">, </span
          ><span class="text-code-yellow">{{ maxInClamp }}</span
          ><span class="text-code-red">{{ unit }}</span
          ><span class="text-code-purple">)</span>
        </template>
      </code>

      <button
        class="absolute right-5 top-5 text-code-natural hover:text-white active:scale-90"
        aria-label="Copy CSS"
        @click="copyCss"
      >
        <IconCopy />
      </button>
    </div>

    <div class="mt-4">
      <span class="mr-1">Or use</span>
      <InlineLink to="https://github.com/Lehoczky/postcss-fluid" target="_blank"
        >@lehoczky/postcss-fluid</InlineLink
      >
    </div>
  </article>
</template>

<script setup lang="ts">
/**
 * @see {@link https://chriskirknielsen.com/blog/modern-fluid-typography-with-clamp/}
 */
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
const minInClamp = computed(() => Math.min(minValue.value, maxValue.value))
const maxInClamp = computed(() => Math.max(minValue.value, maxValue.value))
const factor = computed(() => {
  return (1 / viewportDifference.value) * valueDifference.value
})
const constantInCalc = computed(() =>
  round(minValue.value - minViewport.value * factor.value, 4)
)
const showConstantPart = computed(() => constantInCalc.value !== 0)
const viewWidthInCalc = computed(() => round(100 * factor.value, 4))

const css = computed(() => {
  if (hideCSS.value) {
    return ""
  }
  const calc = showConstantPart.value
    ? `${constantInCalc.value}${unit.value} + ${viewWidthInCalc.value}vw`
    : `${viewWidthInCalc.value}vw`
  return `clamp(${minInClamp.value}${unit.value}, ${calc}, ${maxInClamp.value}${unit.value})`
})

const { copy } = useClipboard()
function copyCss() {
  return copy(css.value)
}

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
