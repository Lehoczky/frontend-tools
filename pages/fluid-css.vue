<template>
  <div>
    <h1 class="mb-article-heading text-3xl">Fluid CSS calculator</h1>
    <FluidCssInputGrid
      v-model:min-value="minValue"
      v-model:max-value="maxValue"
      v-model:min-viewport="minViewport"
      v-model:max-viewport="maxViewport"
      v-model:unit="unit"
    />

    <FluidCssCodeBlock
      class="mt-5"
      :min-value="minValue"
      :max-value="maxValue"
      :min-viewport="minViewport"
      :max-viewport="maxViewport"
      :unit="unit"
    />

    <FluidCssSeeAlso class="mt-4" />
  </div>
</template>

<script setup lang="ts">
/**
 * @see {@link https://chriskirknielsen.com/blog/modern-fluid-typography-with-clamp/}
 */

useHead({
  title: "Fluid CSS",
})

const unit = ref<"rem" | "px">("rem")
const minValue = ref(1)
const maxValue = ref(1.5)
const minViewport = ref(40)
const maxViewport = ref(120)
</script>
