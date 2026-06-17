import { imageSlider } from "./ImageSlider";

describe("ImageSlider", () => {
  const images = [
    "https://i.imgur.com/rmydi2w.jpg",
    "https://i.imgur.com/rAFqZiM.jpg",
    "https://i.imgur.com/Fpw5KKY.jpg",
    "https://i.imgur.com/IbYRmoW.jpg",
    "https://i.imgur.com/9poVrgA.jpg",
  ];

  beforeEach(() => {
    document.documentElement.innerHTML = global.htmlContent;
  });

  test("displays the first image", () => {
    imageSlider(images);
    const img = document.querySelector("img");
    expect(img.src).toBe(images[0]);
  });

  test("has the previous button initially disabled", () => {
    imageSlider(images);
    const prevBtn = document.querySelector("button:first-of-type");
    expect(prevBtn.disabled).toBe(true);
  });

  test("show the next image when clicking on the next button", () => {
    imageSlider(images);
    const nextBtn = document.querySelector("button:last-of-type");
    const img = document.querySelector("img");

    nextBtn.click();
    expect(img.src).toBe(images[1]);
  });

  test("show the previous image when clicking on the previous button", () => {
    imageSlider(images);
    const prevBtn = document.querySelector("button:first-of-type");
    const nextBtn = document.querySelector("button:last-of-type");
    const img = document.querySelector("img");
    // First go to second image
    nextBtn.click();
    // Then go back to first image
    prevBtn.click();
    expect(img.src).toBe(images[0]);
  });
});
