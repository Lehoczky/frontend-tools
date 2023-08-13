<template>
  <ContentDoc v-slot="{ doc }">
    <div
      class="grid gap-y-8 font-sans lg:grid-cols-[auto_256px] lg:grid-rows-none lg:gap-x-10"
    >
      <ContentRenderer class="overflow-x-hidden" :value="doc" />

      <TableOfContents
        class="top-28 row-start-1 self-baseline lg:sticky lg:row-start-auto"
        :value="doc.body.toc"
      />
    </div>
  </ContentDoc>
</template>

<script setup>
definePageMeta({
  title: "Style Guide",
  layout: "style-guide",
})
</script>
