<template>
  <ul class="list-disc space-y-2 pl-5">
    <slot />
  </ul>
</template>

<style scoped>
ul ul {
  @apply list-circle;
}
</style>
