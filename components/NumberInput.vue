<script lang="ts">
import { endsWithDot, hasOneDot, startsWithDigit } from "~~/utils"

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
  (event: "update:modelValue", value: number): void
}>()

const value = computed<number>({
  get() {
    return props.modelValue == null ? undefined : Number(props.modelValue)
  },
  set(inputValue: unknown) {
    const value = String(inputValue)
    if (value === "") {
      emit("update:modelValue", undefined)
      return
    }
    if (
      isTryingToTypeNegativeNumber(value) ||
      isTryingToTypeFloatNumber(value)
    ) {
      return
    }

    const number = value ? Number(replaceDecimals(value)) : undefined
    if (Number.isNaN(number)) {
      // Something wrong has been typed in, but we don't want to clear
      // the input, so we pretend nothing happened
    } else {
      emit("update:modelValue", number)
    }
  },
})

const { copy } = useClipboard()
async function copyValueWithSuffix() {
  if (value.value) {
    const suffix = props.suffix ?? ""
    await copy(value.value + suffix)
  }
}

const handleKeydownEvent = (event: KeyboardEvent) => {
  if (event.key === "ArrowDown") {
    value.value = value.value === undefined ? -1 : value.value - 1
    event.preventDefault()
  } else if (event.key === "ArrowUp") {
    value.value = value.value === undefined ? 1 : value.value + 1
    event.preventDefault()
  }
}

const isTryingToTypeNegativeNumber = (value: string) => {
  return value === "-"
}

const isTryingToTypeFloatNumber = (value: string): boolean => {
  return startsWithDigit(value) && hasOneDot(value) && endsWithDot(value)
}

const replaceDecimals = (value: unknown) => String(value).replace(",", ".")
</script>

<template>
  <div class="relative inline-block">
    <input
      v-bind="$attrs"
      v-model="value"
      :inputmode="inputmode"
      type="text"
      class="w-full rounded-md bg-base-500 px-5 py-3 text-center !leading-none outline-none ring-gray-500 focus:ring"
      @keydown="handleKeydownEvent($event)"
      @click.ctrl="copyValueWithSuffix()"
    />

    <div
      v-if="suffix"
      class="absolute right-6 top-1/2 -translate-y-1/2 text-lg leading-none"
    >
      {{ suffix }}
    </div>
  </div>
</template>
