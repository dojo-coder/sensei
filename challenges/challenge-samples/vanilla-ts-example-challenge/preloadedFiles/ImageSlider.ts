export function imageSlider(images: string[] = []): void {
  const img = document.querySelector<HTMLImageElement>("img");
  const buttons = Array.from(
    document.querySelectorAll<HTMLButtonElement>("button")
  );

  const byText = (el: Element, text: string): boolean =>
    (el.textContent ?? "").trim().toLowerCase().includes(text);

  const prevBtn: HTMLButtonElement =
    buttons.find((b) => byText(b, "prev")) ?? buttons[0];
  const nextBtn: HTMLButtonElement =
    buttons.find((b) => byText(b, "next")) ?? buttons[1];

  let currentIndex: number = 0;

  function updateUI(): void {
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
