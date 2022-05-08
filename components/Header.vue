<template>
  <header
    class="sticky top-0 z-50 flex items-center bg-base-500 p-2.5 sm:opacity-90"
  >
    <nav class="mr-6 flex w-full items-center justify-between">
      <button class="sm:hidden" @click="open = !open">
        <IconClose v-if="open" />
        <IconMenu v-else />
      </button>
      <ul
        class="fixed top-11 bottom-0 -left-3/4 flex w-3/4 flex-col gap-2 bg-base-500 transition-transform duration-300 ease-out sm:relative sm:top-auto sm:bottom-auto sm:left-auto sm:right-auto sm:w-auto sm:translate-x-0 sm:flex-row"
        :class="{ 'translate-x-full': open }"
      >
        <li>
          <NuxtLink
            class="transition-color inline-flex w-full items-center py-4 px-4 ease-out hover:bg-base-400 active:scale-95 sm:rounded-md sm:py-2"
            to="https://imagecolorpicker.com/en"
            target="_blank"
            >Color Picker<IconExternal class="ml-2.5"
          /></NuxtLink>
        </li>

        <li>
          <NuxtLink
            class="transition-color inline-flex w-full items-center py-5 px-4 ease-out hover:bg-base-400 active:scale-95 sm:rounded-md sm:py-2"
            to="https://jakearchibald.github.io/svgomg/"
            target="_blank"
            >SVG optimizer<IconExternal class="ml-2.5"
          /></NuxtLink>
        </li>

        <li>
          <NuxtLink
            class="transition-color inline-flex w-full items-center py-4 px-4 ease-out hover:bg-base-400 active:scale-95 sm:rounded-md sm:py-2"
            to="https://realfavicongenerator.net/"
            target="_blank"
            >Favicon generator<IconExternal class="ml-2.5"
          /></NuxtLink>
        </li>
      </ul>

      <NuxtLink
        aria-label="Spotify"
        class="transition ease-out hover:text-gray-100 active:scale-95"
        to="https://open.spotify.com/"
        target="_blank"
        ><IconSpotify
      /></NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
const open = ref(false)
</script>
