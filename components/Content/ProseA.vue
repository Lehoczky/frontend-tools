<template>
  <InlineLink :to="href" :target="target">
    <slot />
  </InlineLink>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String,
    default: "_blank",
    required: false,
  },
})
</script>
