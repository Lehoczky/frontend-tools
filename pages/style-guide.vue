<template>
  <ContentDoc v-slot="{ doc }">
    <div class="grid grid-cols-[auto_256px] gap-x-10">
      <ContentRenderer class="overflow-x-hidden" :value="doc" />

      <TableOfContents
        class="sticky top-28 self-baseline"
        :value="doc.body.toc"
      />
    </div>
  </ContentDoc>
</template>

<script setup>
definePageMeta({
  layout: "style-guide",
})
</script>
