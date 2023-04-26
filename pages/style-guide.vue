<template>
  <ContentDoc v-slot="{ doc }">
    <TableOfContents :value="doc.body.toc" />
    <ContentRenderer :value="doc" />
  </ContentDoc>
</template>
