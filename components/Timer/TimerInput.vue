<template>
  <div
    class="flex cursor-text justify-center rounded-md bg-base-500 px-5 py-4 text-4xl outline-none ring-gray-600 focus-within:ring sm:justify-normal"
    :class="{
      'text-opacity-50': editing,
    }"
    @click="focusInput"
  >
    <slot :editing="editing" :caret-position="caretPosition" />

    <input
      ref="input"
      v-model="value"
      type="tel"
      class="sr-only"
      :maxlength="MAX_INPUT_LENGTH"
      @keypress="preventNonNumericInput($event)"
      @keydown.left="moveCaretLeft()"
      @keydown.right="moveCaretRight()"
      @focus="onFocus()"
      @blur="onBlur()"
    />
  </div>
</template>

<script lang="ts">
export const MAX_INPUT_LENGTH = 6
</script>

<script setup lang="ts">
interface Props {
  modelValue?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
})

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void
  (event: "caret-position-change", value: number): void
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
const editing = ref(false)

function preventNonNumericInput(event: KeyboardEvent) {
  if (!isDigit(event.key)) {
    event.preventDefault()
  }
}

const caretPosition = ref(0)
function moveCaretLeft() {
  caretPosition.value = Math.min(
    caretPosition.value + 1,
    input.value.value.length,
  )
}
function moveCaretRight() {
  caretPosition.value = Math.max(caretPosition.value - 1, 0)
}

function focusInput() {
  input.value.selectionStart = input.value.value.length
  input.value.focus()
}

function onFocus() {
  editing.value = true
}
function onBlur() {
  editing.value = false
  caretPosition.value = 0
}
</script>
