<template>
  <code
    class="mx-px rounded bg-zinc-700 px-1 py-0.5 text-sm font-normal text-zinc-100"
  >
    <slot />
  </code>
</template>

<style scoped>
:is(h1, h2, h3, h4, h5, h6) > a code {
  @apply px-2 py-1 text-[0.75em] text-inherit;
}
</style>
