<script setup lang="ts">
import ImageSlider from './ImageSlider.vue'

const images: string[] = [
  'https://i.imgur.com/rmydi2w.jpg',
  'https://i.imgur.com/rAFqZiM.jpg',
  'https://i.imgur.com/Fpw5KKY.jpg',
  'https://i.imgur.com/IbYRmoW.jpg',
  'https://i.imgur.com/9poVrgA.jpg',
]
</script>

<template>
  <div class="app">
    <h1>Image Slider</h1>
    <p class="subtitle">
      Use Previous / Next to browse. The buttons disable at the first and last
      image. Edit <code>App.vue</code> to swap in your own images.
    </p>
    <ImageSlider :images="images" />
  </div>
</template>

<style scoped>
.app {
  font-family: system-ui, sans-serif;
  max-width: 640px;
  margin: 40px auto;
  text-align: center;
}

.subtitle {
  color: #666;
}
</style>
