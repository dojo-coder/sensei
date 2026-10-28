<template>
  <div>
    <p>Count: {{ count }}</p>
    <button :disabled="count === 0" @click="decrement">Decrement</button>
    <button @click="increment">Increment</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const count = ref(0);

  function increment() {
    count.value += 1;
  }

  function decrement() {
    if (count.value > 0) count.value -= 1;
  }

  function reset() {
    if (count.value > 1) count.value = 0;
  }
</script>
