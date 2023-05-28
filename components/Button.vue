<template>
  <component
    :is="component"
    :to="to"
    class="transition-color inline-flex items-center gap-1.5 rounded-md px-6 py-4 ease-out active:scale-95 disabled:opacity-50 disabled:active:scale-100 sm:px-4 sm:py-2"
    :class="{
      'bg-base-500 hover:bg-base-400 disabled:hover:bg-base-500':
        color === 'default',
      'bg-sky-800 hover:bg-sky-700 disabled:hover:bg-sky-800': color === 'blue',
      'bg-rose-800 hover:bg-rose-700 disabled:hover:bg-rose-800':
        color === 'red',
    }"
    v-bind="additionalProps"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router"

const props = defineProps({
  color: {
    type: String as PropType<"default" | "blue" | "red">,
    default: "default",
  },
  to: {
    type: [String, Object] as PropType<string | RouteLocationRaw>,
    default: undefined,
    required: false,
  },
})

const component = computed(() => {
  return props.to ? resolveComponent("nuxt-link") : "button"
})

const additionalProps = computed(() => {
  return props.to && isExternalLink(props.to) ? { target: "_blank" } : {}
})

function isExternalLink(url: string) {
  return url.startsWith("http")
}
</script>
