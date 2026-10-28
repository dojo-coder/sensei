<script>
  let count = 0;

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }

  function reset() {
    count = 0;
  }
</script>

<main>
  <p>Count: {count}</p>
  <button on:click={decrement}>Decrement</button>
  <button on:click={increment}>Increment</button>
  <button on:click={reset}>Reset</button>
</main>
