<template>
  <section class="my-8">
    <h2 class="mb-3 text-2xl">
      <slot name="title" />
    </h2>

    <div class="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-3">
      <slot name="links" />
    </div>
  </section>
</template>
