<template>
  <div>
    <NuxtLink to="/">
      <IconAngular />
      <span>Angular</span>
    </NuxtLink>

    <NuxtLink to="/">
      <IconVue />
      <span>Vue</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Learning",
})
</script>
