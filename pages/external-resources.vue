<template>
  <ExternalResourcesSection>
    <template #title>SVG</template>

    <template #links>
      <Button to="https://jakearchibald.github.io/svgomg/" target="_blank">
        <IconSVGO class="h-[1em] grayscale" />
        SVG Optimizer
      </Button>

      <Button to="https://svgcrop.com/" target="_blank">SVG Crop</Button>
      <Button to="https://icones.js.org/" target="_blank">Icônes</Button>
    </template>
  </ExternalResourcesSection>

  <ExternalResourcesSection>
    <template #title>CSS</template>

    <template #links>
      <Button to="https://tailwindcss.com/" target="_blank">
        TailwindCSS
      </Button>

      <Button
        to="https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js"
        target="_blank"
      >
        TailwindCSS Default Theme
      </Button>

      <Button to="https://fuze.8bit.codes/" target="_blank">
        CSS Gradient Animator
      </Button>

      <Button to="https://imagecolorpicker.com/en" target="_blank">
        Color Picker
      </Button>

      <Button to="https://smolcss.dev/" target="_blank"> SmolCSS </Button>

      <Button to="https://moderncss.dev/" target="_blank"> Modern CSS </Button>
    </template>
  </ExternalResourcesSection>

  <ExternalResourcesSection>
    <template #title>UX</template>

    <template #links>
      <Button to="https://lawsofux.com/" target="_blank"> Laws of UX </Button>
    </template>
  </ExternalResourcesSection>

  <ExternalResourcesSection>
    <template #title>Misc</template>

    <template #links>
      <Button to="https://realfavicongenerator.net/" target="_blank">
        Favicon Generator
      </Button>

      <Button to="https://caniuse.com/" target="_blank"> Can I use </Button>

      <Button to="https://better-mobile-inputs.netlify.app/" target="_blank">
        Better Mobile Inputs
      </Button>
    </template>
  </ExternalResourcesSection>
</template>

<script setup lang="ts">
useHead({
  title: "External Resources",
})
</script>
