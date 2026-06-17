<script>
  export let images = [];

  let currentImage = 0;

  $: isPrevDisabled = currentImage === 0;
  $: isNextDisabled = currentImage === images.length - 1;

  function nextImage() {
    if (currentImage !== images.length - 1) {
      currentImage++;
    }
  }

  function previousImage() {
    if (currentImage !== 0) {
      currentImage--;
    }
  }
</script>

<div>
  <img
    src={images[currentImage]}
    width="200"
    height="250"
    alt="Image {currentImage + 1}" />
  <button disabled={isPrevDisabled} on:click={previousImage}> Previous </button>
  <button disabled={isNextDisabled} on:click={nextImage}> Next </button>
</div>