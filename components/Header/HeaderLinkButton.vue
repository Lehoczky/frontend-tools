<template>
  <NuxtLink
    class="header-link transition-color inline-flex w-full items-center gap-3 rounded-lg px-4 py-5 ease-out hover:bg-base-400 active:scale-95 sm:rounded-md sm:py-2"
    ><slot
  /></NuxtLink>
</template>

<style>
.header-link.router-link-exact-active {
  @apply bg-base-400;
}
</style>
