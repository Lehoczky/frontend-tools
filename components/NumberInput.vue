<template>
  <div class="relative inline-block">
    <input
      v-bind="$attrs"
      v-model="value"
      :inputmode="inputmode"
      type="text"
      class="w-full rounded-md bg-base-500 px-5 py-4 text-center outline-none ring-gray-500 focus:ring"
      @keydown="handleKeydownEvent($event)"
    />

    <div
      v-if="suffix"
      class="absolute top-1/2 right-6 -translate-y-1/2 leading-none text-lg"
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
  inputmode?: "text" | "decimal" | "numeric"
}
const props = withDefaults(defineProps<Props>(), {
  suffix: undefined,
  modelValue: undefined,
  inputmode: "decimal",
  modelModifiers: () => ({}),
})

const emit = defineEmits<{
  (e: "update:modelValue", value: number): number
}>()

const value = computed<number>({
  get() {
    return props.modelValue == undefined ? undefined : Number(props.modelValue)
  },
  set(inputValue: unknown) {
    const value = String(inputValue)
    if (value === "-") {
      // The user wants to type in a negative number, we don't
      // want to emit a new value at this state
      return
    }

    let number = value ? Number(replaceDecimals(value)) : undefined
    number = isNaN(number) ? undefined : number

    emit("update:modelValue", number)
  },
})

const handleKeydownEvent = (event: KeyboardEvent) => {
  if (event.key === "ArrowDown") {
    value.value = value.value === undefined ? -1 : value.value - 1
    event.preventDefault()
  } else if (event.key === "ArrowUp") {
    value.value = value.value === undefined ? 1 : value.value + 1
    event.preventDefault()
  }
}

const replaceDecimals = (value: unknown) => String(value).replace(",", ".")
</script>
