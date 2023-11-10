<template>
  <div
    class="relative w-[1ch] text-center after:absolute after:-right-0 after:bottom-0.5 after:left-0 after:h-0.5 after:bg-current after:opacity-0"
    :class="{
      'opacity-50': fade,
      'opacity-0': hide,
      'after:opacity-100': showCaret,
    }"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  fade: {
    type: Boolean,
    default: false,
  },
  hide: {
    type: Boolean,
    default: false,
  },
  showCaret: {
    type: Boolean,
    default: false,
  },
})
</script>
