<template>
  <aside class="hidden sm:block">
    <nav aria-labelledby="aside-toc">
      <div id="aside-toc" class="mb-2 text-2xl lg:text-lg">
        Table of contents
      </div>

      <ul
        v-if="value.links"
        class="flex-wrap gap-x-8 gap-y-1.5 sm:flex lg:flex-col lg:gap-0.5"
      >
        <li v-for="link in value.links" :key="link.text">
          <NuxtLink
            :to="`#${link.id}`"
            class="bg-gradient-to-r from-base-300 to-base-300 bg-[length:0_2px] bg-right-bottom bg-no-repeat pb-px text-base-300 transition-[background-size] duration-300 hover:from-base-200 hover:to-base-200 hover:bg-[length:100%_2px] hover:bg-left-bottom hover:text-base-200 hover:text-opacity-100 motion-reduce:transition-none"
            :class="{
              '!from-sky-500 !to-sky-500 bg-[length:100%_2px] !text-sky-500 ':
                isActiveLink(link.id),
            }"
          >
            {{ link.text }}
          </NuxtLink>
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

const { updateHeadings, activeHeadings } = useScrollspy()

function isActiveLink(id: string) {
  return activeHeadings.value.includes(id)
}

if (process.client) {
  setTimeout(() => {
    updateHeadings([
      ...document.querySelectorAll("h1"),
      ...document.querySelectorAll("h2"),
    ])
  }, 300)
}
</script>
