<script setup lang="ts">
import useRadioGroupContext from "./context"

const props = defineProps<{ value: any }>()
const context = useRadioGroupContext("RadioGroupOption")

const checked = computed(() => context.value.value === props.value)
</script>

<template>
  <label class="cursor-pointer">
    <input
      type="radio"
      class="mr-1 inline-flex h-7 w-7 cursor-pointer appearance-none items-center justify-center rounded-full border-2 border-base-200 after:h-5 after:w-5 after:scale-0 after:rounded-full after:bg-base-200 after:transition-transform after:duration-200 after:ease-out checked:after:scale-100 sm:h-5 sm:w-5 sm:after:h-3 sm:after:w-3"
      :name="context.id"
      :checked="checked"
      :value="value"
      @change="context.change(value)"
    />
    <span><slot /></span>
  </label>
</template>
