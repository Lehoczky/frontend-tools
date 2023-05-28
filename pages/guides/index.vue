<template>
  <div class="flex flex-col gap-4">
    <Button to="/guides/development-environment" class="!px-8 !py-5 text-2xl">
      <IconCode class="mr-3 h-10 w-10 shrink-0" />
      <span>Development Environment</span>
    </Button>

    <Button to="/guides/pc-setup" class="!px-8 !py-5 text-2xl">
      <IconLaptop class="mr-3 h-10 w-10 shrink-0" />
      <span>PC Setup</span>
    </Button>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Guides",
})
</script>
