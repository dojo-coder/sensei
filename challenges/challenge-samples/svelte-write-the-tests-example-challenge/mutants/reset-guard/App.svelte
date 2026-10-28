<script>
  let count = 0;

  function increment() {
    count += 1;
  }

  function decrement() {
    if (count > 0) count -= 1;
  }

  function reset() {
    if (count > 1) count = 0;
  }
</script>

<main>
  <p>Count: {count}</p>
  <button on:click={decrement} disabled={count === 0}>Decrement</button>
  <button on:click={increment}>Increment</button>
  <button on:click={reset}>Reset</button>
</main>
