<script>
  export let images = [];

  let currentImage = 0;

  $: isPrevDisabled = currentImage === 0;
  $: isNextDisabled = currentImage === images.length - 1;

  function previousImage() {
    if (!isPrevDisabled) currentImage -= 1;
  }

  function nextImage() {
    if (!isNextDisabled) currentImage += 1;
  }
</script>

{#if images.length === 0}
  <p>No images to display.</p>
{:else}
  <div class="wrapper">
    <img class="image" src={images[currentImage]} alt={`Slide ${currentImage + 1}`} />
    <div class="controls">
      <button
        class="button"
        class:disabled={isPrevDisabled}
        disabled={isPrevDisabled}
        on:click={previousImage}
      >
        Previous
      </button>
      <span class="counter">{currentImage + 1} / {images.length}</span>
      <button
        class="button"
        class:disabled={isNextDisabled}
        disabled={isNextDisabled}
        on:click={nextImage}
      >
        Next
      </button>
    </div>
  </div>
{/if}

<style>
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
    background: #ff3e00;
    color: white;
    cursor: pointer;
  }

  .button.disabled {
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
