/**
 * Renders an image slider into the given container element.
 *
 * @param container - the host element to render the slider into
 * @param images - the list of image URLs to cycle through
 */
export function createImageSlider(
  container: HTMLElement,
  images: string[]
): void {
  container.innerHTML = "";

  if (images.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No images to display.";
    container.appendChild(empty);
    return;
  }

  let currentImage = 0;

  const wrapper = document.createElement("div");
  wrapper.className = "slider-wrapper";

  const image = document.createElement("img");
  image.className = "slider-image";

  const controls = document.createElement("div");
  controls.className = "slider-controls";

  const prevButton = document.createElement("button");
  prevButton.className = "slider-button";
  prevButton.type = "button";
  prevButton.textContent = "Previous";

  const counter = document.createElement("span");
  counter.className = "slider-counter";

  const nextButton = document.createElement("button");
  nextButton.className = "slider-button";
  nextButton.type = "button";
  nextButton.textContent = "Next";

  const render = (): void => {
    image.src = images[currentImage];
    image.alt = `Slide ${currentImage + 1}`;
    counter.textContent = `${currentImage + 1} / ${images.length}`;
    prevButton.disabled = currentImage === 0;
    nextButton.disabled = currentImage === images.length - 1;
  };

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

  controls.append(prevButton, counter, nextButton);
  wrapper.append(image, controls);
  container.appendChild(wrapper);

  render();
}
