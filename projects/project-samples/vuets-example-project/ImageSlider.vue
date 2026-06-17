<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const currentImage = ref(0)

const isPrevDisabled = computed(() => currentImage.value === 0)
const isNextDisabled = computed(
  () => currentImage.value === props.images.length - 1
)

function nextImage(): void {
  if (!isNextDisabled.value) currentImage.value++
}

function previousImage(): void {
  if (!isPrevDisabled.value) currentImage.value--
}
</script>

<template>
  <p v-if="images.length === 0">No images to display.</p>
  <div v-else class="wrapper">
    <img
      class="image"
      :src="images[currentImage]"
      :alt="`Slide ${currentImage + 1}`"
    />
    <div class="controls">
      <button
        class="button"
        :disabled="isPrevDisabled"
        @click="previousImage"
      >
        Previous
      </button>
      <span class="counter">{{ currentImage + 1 }} / {{ images.length }}</span>
      <button
        class="button"
        :disabled="isNextDisabled"
        @click="nextImage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.image {
  width: 400px;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.button {
  padding: 8px 18px;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  cursor: pointer;
}

.button:disabled {
  background: #c7c7d1;
  cursor: not-allowed;
}

.counter {
  min-width: 52px;
  text-align: center;
  color: #444;
  font-variant-numeric: tabular-nums;
}
</style>
