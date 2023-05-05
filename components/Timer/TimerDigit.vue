<template>
  <div
    class="w-[1ch] text-right"
    :class="{
      'opacity-50': fade,
      'opacity-0': hide,
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
})
</script>
