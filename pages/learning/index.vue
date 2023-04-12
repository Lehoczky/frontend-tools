<template>
  <div class="mt-10 grid grid-cols-[repeat(2,14rem)] justify-center gap-4">
    <LearningCategoryLink to="/learning/angular">
      <template #icon>
        <IconAngular class="h-10 w-10" />
      </template>

      Angular
    </LearningCategoryLink>

    <LearningCategoryLink to="/learning/vue">
      <template #icon>
        <IconVue class="h-10 w-10" />
      </template>

      Vue
    </LearningCategoryLink>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Learning",
})
</script>
