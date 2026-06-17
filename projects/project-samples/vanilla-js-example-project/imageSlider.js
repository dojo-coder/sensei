// Mounts an image slider into the given container element.
// Renders an image, Previous/Next buttons (disabled at the ends),
// and a "current / total" counter. State is kept in a local index.
export function createImageSlider(container, images = []) {
  if (!container) {
    throw new Error("createImageSlider: a container element is required.");
  }

  if (!Array.isArray(images) || images.length === 0) {
    container.textContent = "No images to display.";
    return;
  }

  let currentImage = 0;

  // Build the DOM once, then update it on state changes.
  const wrapper = document.createElement("div");
  wrapper.className = "slider";

  const image = document.createElement("img");
  image.className = "slider__image";

  const controls = document.createElement("div");
  controls.className = "slider__controls";

  const prevButton = document.createElement("button");
  prevButton.className = "slider__button";
  prevButton.type = "button";
  prevButton.textContent = "Previous";

  const counter = document.createElement("span");
  counter.className = "slider__counter";

  const nextButton = document.createElement("button");
  nextButton.className = "slider__button";
  nextButton.type = "button";
  nextButton.textContent = "Next";

  controls.append(prevButton, counter, nextButton);
  wrapper.append(image, controls);
  container.replaceChildren(wrapper);

  function render() {
    image.src = images[currentImage];
    image.alt = `Slide ${currentImage + 1}`;
    counter.textContent = `${currentImage + 1} / ${images.length}`;
    prevButton.disabled = currentImage === 0;
    nextButton.disabled = currentImage === images.length - 1;
  }

  prevButton.addEventListener("click", () => {
    if (currentImage > 0) {
      currentImage -= 1;
      render();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentImage < images.length - 1) {
      currentImage += 1;
      render();
    }
  });

  render();
}
