<template>
  <div class="relative min-h-[4rem] rounded-sm bg-base-800 py-5 pl-5 pr-14">
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

    <FluidCssCopyButton class="absolute right-5 top-5" :text="css" />
  </div>
</template>

<script setup lang="ts">
import { round } from "lodash-es"

const props = defineProps<{
  minValue: number
  maxValue: number
  minViewport: number
  maxViewport: number
  unit: "px" | "rem"
}>()

const valueDifference = computed(() => props.maxValue - props.minValue)
const viewportDifference = computed(() => props.maxViewport - props.minViewport)
const hideCSS = computed(
  () => isNaN(valueDifference.value) || isNaN(viewportDifference.value)
)
const minInClamp = computed(() => Math.min(props.minValue, props.maxValue))
const maxInClamp = computed(() => Math.max(props.minValue, props.maxValue))
const factor = computed(() => {
  return (1 / viewportDifference.value) * valueDifference.value
})
const constantInCalc = computed(() =>
  round(props.minValue - props.minViewport * factor.value, 4)
)
const showConstantPart = computed(() => constantInCalc.value !== 0)
const viewWidthInCalc = computed(() => round(100 * factor.value, 4))

const css = computed(() => {
  if (hideCSS.value) {
    return ""
  }
  const calc = showConstantPart.value
    ? `${constantInCalc.value}${props.unit} + ${viewWidthInCalc.value}vw`
    : `${viewWidthInCalc.value}vw`
  return `clamp(${minInClamp.value}${props.unit}, ${calc}, ${maxInClamp.value}${props.unit})`
})
</script>
