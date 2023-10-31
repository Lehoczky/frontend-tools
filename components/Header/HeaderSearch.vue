<template>
  <AlgoliaDocSearch class="algolia" />
</template>

<style>
.algolia {
  --docsearch-searchbox-background: theme(colors.base.700);
  --docsearch-searchbox-focus-background: theme(colors.base.600);
  --docsearch-text-color: theme(colors.base.300);
  --docsearch-muted-color: theme(colors.base.300);
}

/* stylelint-disable-next-line selector-class-pattern */
.algolia .DocSearch-Button {
  /* stylelint-disable-next-line value-keyword-case */
  border-radius: theme(borderRadius.md);
}
</style>
