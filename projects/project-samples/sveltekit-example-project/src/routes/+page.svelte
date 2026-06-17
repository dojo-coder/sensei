<script>
  /** @type {{ data: { items: Array<{ id: number, name: string, price: number }> } }} */
  let { data } = $props();
</script>

<svelte:head>
  <title>SvelteKit Items App</title>
</svelte:head>

<main>
  <h1>Items</h1>
  <p>
    Loaded server-side via <code>+page.server.js</code>. The same data is also
    available as JSON at <a href="/api/items">/api/items</a>.
  </p>

  <ul>
    {#each data.items as item (item.id)}
      <li>
        <span class="name">{item.name}</span>
        <span class="price">${item.price.toFixed(2)}</span>
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
    max-width: 32rem;
    margin: 2rem auto;
    padding: 0 1rem;
    font-family: system-ui, sans-serif;
  }

  h1 {
    margin-bottom: 0.25rem;
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
    color: #2563eb;
    font-variant-numeric: tabular-nums;
  }
</style>
