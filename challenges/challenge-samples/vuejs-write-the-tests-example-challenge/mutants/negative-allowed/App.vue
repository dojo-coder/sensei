<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="decrement">Decrement</button>
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
    count.value -= 1;
  }

  function reset() {
    count.value = 0;
  }
</script>
