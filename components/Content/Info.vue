<template>
  <details class="my-4 rounded-lg border border-base-400 bg-base-600 p-4">
    <summary class="cursor-pointer">
      <div class="inline-block pl-1">
        <slot name="summary" />
      </div>
    </summary>

    <div class="mt-4 border-t border-base-400 pt-4">
      <slot name="content" />
    </div>
  </details>
</template>

<script setup lang="ts"></script>

<style scoped>
:deep(summary p) {
  @apply m-0 inline-block;
}
</style>
