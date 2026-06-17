<template>
  <div class="text-center">
    <img :src="images[currentImage]" width="400" height="500" />
    <button
      class="btn btn-primary"
      :disabled="isPrevDisabled"
      @click="previousImage"
    >
      Previous
    </button>
    <button
      class="btn btn-primary"
      :disabled="isNextDisabled"
      @click="nextImage"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  images?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  images: () => [],
});

const currentImage = ref<number>(0);

const isPrevDisabled = computed<boolean>(() => {
  return currentImage.value === 0;
});

const isNextDisabled = computed<boolean>(() => {
  return currentImage.value === props.images.length - 1;
});

const nextImage = (_e: MouseEvent): void => {
  if (currentImage.value !== props.images.length - 1) {
    currentImage.value++;
  }
};

const previousImage = (_e: MouseEvent): void => {
  if (currentImage.value !== 0) {
    currentImage.value--;
  }
};
</script>

<style>
.removed {
  color: gray;
}

.removed label {
  text-decoration: line-through;
}
</style>
