<template>
  <Transition name="fade">
    <slot />
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-75;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
