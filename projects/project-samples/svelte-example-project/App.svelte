<script>
  import ImageSlider from "./ImageSlider.svelte";

  const images = [
    "https://i.imgur.com/rmydi2w.jpg",
    "https://i.imgur.com/rAFqZiM.jpg",
    "https://i.imgur.com/Fpw5KKY.jpg",
    "https://i.imgur.com/IbYRmoW.jpg",
    "https://i.imgur.com/9poVrgA.jpg",
  ];
</script>

<main>
  <h1>Image Slider</h1>
  <p>
    Use Previous / Next to browse. The buttons disable at the first and last
    image. Edit <code>App.svelte</code> to swap in your own images.
  </p>
  <ImageSlider {images} />
</main>

<style>
  main {
    font-family: system-ui, sans-serif;
    max-width: 640px;
    margin: 40px auto;
    text-align: center;
  }

  p {
    color: #666;
  }
</style>
