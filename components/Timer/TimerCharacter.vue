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

<template>
  <div
    :class="{
      'opacity-50': fade,
      'opacity-0': hide,
    }"
  >
    <slot />
  </div>
</template>
