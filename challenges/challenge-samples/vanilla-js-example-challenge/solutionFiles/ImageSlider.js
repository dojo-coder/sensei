export function imageSlider(images = []) {
  const img = document.querySelector("img");
  const buttons = Array.from(document.querySelectorAll("button"));

  const byText = (el, text) =>
    el.textContent.trim().toLowerCase().includes(text);
  const prevBtn = buttons.find((b) => byText(b, "prev")) || buttons[0];
  const nextBtn = buttons.find((b) => byText(b, "next")) || buttons[1];

  let currentIndex = 0;

  function updateUI() {
    const hasImages = images.length > 0;

    if (hasImages) {
      img.src = images[currentIndex];
      img.alt = `Image ${currentIndex + 1}`;
    } else {
      img.removeAttribute("src");
      img.alt = "No images";
    }

    prevBtn.disabled = !hasImages || currentIndex === 0;
    nextBtn.disabled = !hasImages || currentIndex >= images.length - 1;
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateUI();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateUI();
    }
  });

  updateUI();
}
