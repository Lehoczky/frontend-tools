<template>
  <header
    class="sticky top-0 z-50 flex h-16 items-center bg-base-500 p-2.5 shadow-header sm:h-auto sm:opacity-95"
  >
    <nav class="mr-6 flex w-full items-center justify-between">
      <button class="p-3 sm:hidden" @click="open = !open">
        <IconClose v-if="open" />
        <IconMenu v-else />
      </button>

      <ul
        class="fixed -left-3/4 bottom-0 top-16 flex w-3/4 flex-col gap-2 bg-base-500 transition-transform duration-300 ease-out sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:top-auto sm:w-auto sm:translate-x-0 sm:flex-row"
        :class="{ 'translate-x-full': open }"
      >
        <li>
          <HeaderLinkButton to="/" @click="open = false">Home</HeaderLinkButton>
        </li>

        <li>
          <HeaderLinkButton to="/timer" @click="open = false">
            Timer
          </HeaderLinkButton>
        </li>

        <li>
          <HeaderLinkButton to="/fluid-css" @click="open = false">
            Fluid CSS
          </HeaderLinkButton>
        </li>

        <li>
          <HeaderLinkButton to="/style-guides" @click="open = false">
            Style Guides
          </HeaderLinkButton>
        </li>

        <li>
          <HeaderLinkButton to="/learning" @click="open = false">
            Learning
          </HeaderLinkButton>
        </li>
      </ul>

      <HeaderSpotifyLink />
    </nav>
  </header>
</template>

<script setup lang="ts">
const open = ref(false)
</script>
