<template>
  <header
    class="sticky top-0 z-50 flex h-16 items-center bg-base-500 p-2.5 shadow-header sm:h-auto sm:opacity-95"
  >
    <nav class="mr-6 flex w-full items-center justify-between">
      <button class="p-3 sm:hidden" @click="open = !open">
        <IconMenu />
      </button>

      <ul
        class="fixed -left-[80%] bottom-0 top-0 z-10 flex w-[80%] flex-col gap-2 bg-base-500 shadow-lg transition-transform duration-200 ease-out sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:top-auto sm:w-auto sm:translate-x-0 sm:flex-row sm:shadow-none"
        :class="{ 'translate-x-full': open }"
      >
        <div class="flex h-16 items-center p-2.5 sm:hidden">
          <button class="p-3 sm:hidden" @click="open = !open">
            <IconClose />
          </button>
        </div>

        <HeaderListItem>
          <HeaderLinkButton to="/" @click="open = false">
            <IconHome class="inline-block sm:hidden" />
            Home
          </HeaderLinkButton>
        </HeaderListItem>

        <HeaderListItem>
          <HeaderLinkButton to="/timer" @click="open = false">
            <IconTimer class="inline-block sm:hidden" />
            Timer
          </HeaderLinkButton>
        </HeaderListItem>

        <HeaderListItem>
          <HeaderLinkButton to="/fluid-css" @click="open = false">
            <IconCSS class="inline-block sm:hidden" />
            Fluid CSS
          </HeaderLinkButton>
        </HeaderListItem>

        <HeaderListItem>
          <HeaderLinkButton to="/style-guide" @click="open = false">
            <IconCode class="inline-block sm:hidden" />
            Style Guide
          </HeaderLinkButton>
        </HeaderListItem>

        <HeaderListItem>
          <HeaderLinkButton to="/guides" @click="open = false">
            <IconGuide class="inline-block sm:hidden" />
            Guides
          </HeaderLinkButton>
        </HeaderListItem>
      </ul>

      <HeaderSpotifyLink />

      <div
        v-if="open"
        class="fixed inset-0 bg-black bg-opacity-20"
        @click="open = false"
      />
    </nav>
  </header>
</template>

<script setup lang="ts">
const open = ref(false)

const body = ref()
const isLocked = useScrollLock(body)

onMounted(() => {
  body.value = document.querySelector("body")
})

watch(open, (isOpen) => {
  isLocked.value = isOpen
})
</script>
