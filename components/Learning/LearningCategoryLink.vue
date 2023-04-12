<template>
  <NuxtLink
    class="inline-grid place-items-center gap-1 rounded-lg border border-current p-7 hover:text-white active:scale-95"
  >
    <slot name="icon" />
    <div class="text-2xl"><slot /></div>
  </NuxtLink>
</template>
