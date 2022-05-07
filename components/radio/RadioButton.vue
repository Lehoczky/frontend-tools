<template>
  <label class="cursor-pointer">
    <input
      type="radio"
      class="mr-1 inline-flex h-5 w-5 cursor-pointer appearance-none items-center justify-center rounded-full border-2 border-base-300 after:h-3 after:w-3 after:scale-0 after:rounded-full after:bg-base-300 after:transition-transform after:duration-200 after:ease-out checked:after:scale-100"
      :name="context.id"
      :checked="checked"
      :value="value"
      @change="context.change(value)"
    />
    <span><slot /></span>
  </label>
</template>

<script setup lang="ts">
import { useRadioGroupContext } from "./context"

const props = defineProps<{ value: any }>()
const context = useRadioGroupContext("RadioGroupOption")

const checked = computed(() => context.value.value === props.value)
</script>
