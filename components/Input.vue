<template>
  <div class="relative inline-block">
    <input
      v-bind="$attrs"
      v-model="value"
      class="w-full rounded-md bg-base-500 px-5 py-4 text-center text-4xl outline-none ring-gray-500 focus:ring"
    />

    <div
      v-if="suffix"
      class="absolute top-1/2 right-6 -translate-y-1/2 text-lg leading-none"
    >
      {{ suffix }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
interface Props {
  suffix?: string
  modelValue?: unknown
  number?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  suffix: undefined,
  modelValue: undefined,
  modelModifiers: () => ({}),
})

const emit = defineEmits<{
  (e: "update:modelValue", value: string): string
}>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(inputValue: unknown) {
    let value = String(inputValue)

    if (props.number) {
      const number = value ? Number(replaceDecimals(value)) : undefined
      value = isNaN(number) ? undefined : String(number)
    }
    emit("update:modelValue", value)
  },
})

const replaceDecimals = (value: unknown) => String(value).replace(",", ".")
</script>

<style scoped>
/* https://stackoverflow.com/questions/3790935/can-i-hide-the-html5-number-input-s-spin-box */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
