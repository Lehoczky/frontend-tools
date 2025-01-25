<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router"

const props = defineProps({
  color: {
    type: String as PropType<"default" | "blue" | "red">,
    default: "default",
  },
  size: {
    type: String as PropType<"default" | "large">,
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

<template>
  <component
    :is="component"
    :to="to"
    class="transition-color inline-flex items-center gap-1.5 rounded-md ease-out active:scale-95 disabled:opacity-50 disabled:active:scale-100"
    :class="{
      'bg-base-500 hover:bg-base-400 disabled:hover:bg-base-500':
        color === 'default',
      'bg-sky-800 hover:bg-sky-700 disabled:hover:bg-sky-800': color === 'blue',
      'bg-rose-800 hover:bg-rose-700 disabled:hover:bg-rose-800':
        color === 'red',
      'px-6 py-4 sm:px-4 sm:py-2': size === 'default',
      'px-8 py-5 text-2xl': size === 'large',
    }"
    v-bind="additionalProps"
  >
    <slot />
  </component>
</template>
