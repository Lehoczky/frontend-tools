<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
})

const { copy, copied } = useClipboard({ source: toRef(props, "text") })
</script>

<template>
  <button
    class="text-code-natural hover:text-white active:scale-90"
    aria-label="Copy CSS"
    @click="copy()"
  >
    <TransitionFade mode="out-in">
      <IconTick v-if="copied" class="text-green-500" />
      <IconCopy v-else />
    </TransitionFade>
  </button>
</template>
