<template>
  <aside>
    <nav>
      <div class="mb-2 text-lg">Table of contents</div>

      <ul v-if="value.links" class="space-y-0.5">
        <li v-for="link in value.links" :key="link.text">
          <InlineLink :to="`#${link.id}`">
            {{ link.text }}
          </InlineLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import type { Toc } from "@nuxt/content/dist/runtime/types"

defineProps({
  value: {
    type: Object as PropType<Toc>,
    required: true,
  },
})
</script>
