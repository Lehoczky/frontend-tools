<template>
  <fieldset>
    <slot />
  </fieldset>
</template>

<script setup lang="ts">
import { RadioGroupContext } from "./context"

interface Props {
  id: string
  modelValue?: any
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
})

const emit = defineEmits<{
  (e: "update:modelValue", value: any): any
}>()

const value = computed(() => props.modelValue)

provide(RadioGroupContext, {
  value,
  id: props.id,
  change(nextValue: any) {
    emit("update:modelValue", nextValue)
  },
})
</script>
