<template>
  <div class="grid grid-cols-[auto_1fr] items-center gap-2 sm:gap-7">
    <div class="text-2xl">Units:</div>
    <div class="col-span-2 mb-2.5 sm:col-span-1 sm:mb-0">
      <RadioGroup
        id="fluid-css-unit"
        :model-value="unit"
        class="flex gap-5"
        @update:model-value="$emit('update:unit', $event)"
      >
        <RadioButton value="rem">REM</RadioButton>
        <RadioButton value="px">PX</RadioButton>
      </RadioGroup>
    </div>

    <div class="text-2xl">Range:</div>
    <div
      class="col-span-2 mb-2.5 flex items-center gap-2 text-xl sm:col-span-1 sm:mb-0 sm:gap-5"
    >
      <div class="hidden sm:block">from</div>
      <IndexNumberInput
        :model-value="minValue"
        class="max-w-[9rem]"
        @update:model-value="$emit('update:minValue', $event)"
      />
      <div>to</div>
      <IndexNumberInput
        :model-value="maxValue"
        class="max-w-[9rem]"
        @update:model-value="$emit('update:maxValue', $event)"
      />
      <div>{{ unit }}</div>
    </div>

    <div class="text-2xl">Viewport:</div>
    <div
      class="col-span-2 flex items-center gap-2 text-xl sm:col-span-1 sm:gap-5"
    >
      <div class="hidden sm:block">from</div>
      <IndexNumberInput
        :model-value="minViewport"
        class="max-w-[9rem]"
        @update:model-value="$emit('update:minViewport', $event)"
      />
      <div>to</div>
      <IndexNumberInput
        :model-value="maxViewport"
        class="max-w-[9rem]"
        @update:model-value="$emit('update:maxViewport', $event)"
      />
      <div>{{ unit }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  minValue: number
  maxValue: number
  minViewport: number
  maxViewport: number
  unit: "px" | "rem"
}>()

const emit = defineEmits<{
  (event: "update:minValue", value: number): void
  (event: "update:maxValue", value: number): void
  (event: "update:minViewport", value: number): void
  (event: "update:maxViewport", value: number): void
  (event: "update:unit", value: "px" | "rem"): void
}>()

watch(toRef(props, "unit"), (newValue) => {
  const convert = newValue === "px" ? toPX : toREMWithFixedPrecision

  emit("update:minValue", convert(props.minValue))
  emit("update:maxValue", convert(props.maxValue))
  emit("update:minViewport", convert(props.minViewport))
  emit("update:maxViewport", convert(props.maxViewport))
})
</script>
