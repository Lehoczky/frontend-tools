<template>
  <Header />

  <main>
    <PxToRemConverter />
  </main>
</template>

<script setup>
useHead({
  title: "Frontend Tools",
  bodyAttrs: {
    class: "bg-base-700 prose prose-invert",
  },
})
</script>
