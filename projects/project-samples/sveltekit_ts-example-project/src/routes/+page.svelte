<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>SvelteKit Items</title>
</svelte:head>

<main>
  <h1>Items</h1>
  <p>Loaded {data.items.length} item(s) from the server.</p>

  <ul>
    {#each data.items as item (item.id)}
      <li>
        <span class="name">{item.name}</span>
        <span class="price">${item.price.toFixed(2)}</span>
      </li>
    {/each}
  </ul>

  <p>
    The same data is available as JSON at
    <a href="/api/items">/api/items</a>.
  </p>
</main>

<style>
  main {
    max-width: 32rem;
    margin: 2rem auto;
    font-family: system-ui, sans-serif;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #e2e2e2;
  }

  .price {
    font-variant-numeric: tabular-nums;
  }
</style>
