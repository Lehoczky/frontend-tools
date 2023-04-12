<template>
 <Transition name="slide-left">
  <slot/>
 </Transition>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  @apply transition;
}

.slide-left-enter-from,
.slide-left-leave-to {
  @apply translate-x-7 opacity-0;
}

</style>