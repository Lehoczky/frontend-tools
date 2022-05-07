<template>
  <header
    class="sticky top-0 z-50 flex items-center bg-base-500 p-2.5 opacity-90"
  >
    <nav class="mr-6 w-full">
      <ul class="flex gap-2">
        <li>
          <NuxtLink
            class="transition-color inline-flex items-center rounded-md px-4 py-2 ease-out hover:bg-base-400 active:scale-95"
            to="https://imagecolorpicker.com/en"
            target="_blank"
            >Color Picker<IconExternal class="ml-2.5"
          /></NuxtLink>
        </li>

        <li>
          <NuxtLink
            class="transition-color inline-flex items-center rounded-md px-4 py-2 ease-out hover:bg-base-400 active:scale-95"
            to="https://jakearchibald.github.io/svgomg/"
            target="_blank"
            >SVG optimizer<IconExternal class="ml-2.5"
          /></NuxtLink>
        </li>

        <li>
          <NuxtLink
            class="transition-color inline-flex items-center rounded-md px-4 py-2 ease-out hover:bg-base-400 active:scale-95"
            to="https://realfavicongenerator.net/"
            target="_blank"
            >Favicon generator<IconExternal class="ml-2.5"
          /></NuxtLink>
        </li>

        <li class="ml-auto flex items-center">
          <NuxtLink
            aria-label="Spotify"
            class="transition ease-out hover:text-gray-100 active:scale-95"
            to="https://open.spotify.com/"
            target="_blank"
            ><IconSpotify
          /></NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
