<template>
  <div>
    <h1>Todos ({{ items.length }})</h1>
    <input v-model="draft" placeholder="What needs to be done?" />
    <button @click="addTodo">Add</button>
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";

  const items = ref<string[]>([]);
  const draft = ref("");

  function addTodo(): void {
    const text = draft.value.trim();

    if (items.value.some((item) => item.toLowerCase() === text.toLowerCase())) return;

    items.value.push(text);
    draft.value = "";
  }
</script>
