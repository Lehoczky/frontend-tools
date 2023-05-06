<template>
  <div
    class="flex cursor-text rounded-md bg-base-500 px-5 py-4 text-xl outline-none ring-gray-600 focus-within:ring"
    :class="{
      'text-opacity-50': editing,
    }"
    @click="focusInput"
  >
    <slot />

    <input
      ref="input"
      v-model="value"
      type="tel"
      class="sr-only"
      :maxlength="MAX_INPUT_LENGTH"
      @keypress="preventNonNumericInput($event)"
      @focus="emit('update:editing', true)"
      @blur="emit('update:editing', false)"
    />
  </div>
</template>

<script lang="ts">
export const MAX_INPUT_LENGTH = 6
</script>

<script setup lang="ts">
interface Props {
  modelValue?: string
  editing?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  editing: false,
})

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
  (event: "update:editing", value: boolean): void
}>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  },
})

const input = ref<HTMLInputElement>()

function preventNonNumericInput(event: KeyboardEvent) {
  if (!isDigit(event.key)) {
    event.preventDefault()
  }
}

function focusInput() {
  input.value.selectionStart = input.value.value.length
  input.value.focus()
}
</script>
