import { render, fireEvent } from "@testing-library/angular";
import { describe, expect, it } from "@jest/globals";
import { ImageSliderComponent } from "./ImageSlider.component";

describe("ImageSliderComponent", () => {
  const images = [
    "https://i.imgur.com/rmydi2w.jpg",
    "https://i.imgur.com/rAFqZiM.jpg",
    "https://i.imgur.com/Fpw5KKY.jpg",
    "https://i.imgur.com/IbYRmoW.jpg",
    "https://i.imgur.com/9poVrgA.jpg",
  ];

  it("displays the first image", async () => {
    const { getByRole } = await render(ImageSliderComponent, {
      componentProperties: { images },
    });
    const img = getByRole("img");
    expect(img.getAttribute("src")).toBe(images[0]);
  });

  it("has the previous button initially disabled", async () => {
    const { getByText } = await render(ImageSliderComponent, {
      componentProperties: { images },
    });
    const prevBtn = getByText("Previous") as HTMLButtonElement;
    expect(prevBtn.disabled).toBe(true);
  });

  it("show the next image when clicking on the next button", async () => {
    const { getByText, getByRole } = await render(ImageSliderComponent, {
      componentProperties: { images },
    });
    const nextBtn = getByText("Next");
    fireEvent.click(nextBtn);
    const img = getByRole("img");
    expect(img.getAttribute("src")).toBe(images[1]);
  });

  it("show the previous image when clicking on the previous button", async () => {
    const { getByText, getByRole } = await render(ImageSliderComponent, {
      componentProperties: { images },
    });
    const img = getByRole("img");
    const nextBtn = getByText("Next");
    const prevBtn = getByText("Previous");

    // First go to second image
    fireEvent.click(nextBtn);
    // Then go back to first image
    fireEvent.click(prevBtn);
    expect(img.getAttribute("src")).toBe(images[0]);
  });

  it("disables previous button when clicking previous button and the first image is displayed", async () => {
    const { getByText, getByRole } = await render(ImageSliderComponent, {
      componentProperties: { images },
    });
    const img = getByRole("img");
    const nextBtn = getByText("Next") as HTMLButtonElement;
    const prevBtn = getByText("Previous") as HTMLButtonElement;

    // go to the second image
    await fireEvent.click(nextBtn);
    expect(img.getAttribute("src")).toBe(images[1]);
    expect(prevBtn.disabled).toBe(false);

    // back to the first image
    await fireEvent.click(prevBtn);
    expect(prevBtn.disabled).toBe(true);
  });

  it("disables the next button when reaching the last image in images list", async () => {
    const { getByText, getByRole } = await render(ImageSliderComponent, {
      componentProperties: { images },
    });
    const img = getByRole("img");
    const nextBtn = getByText("Next") as HTMLButtonElement;
    for (let i = 0; i < images.length - 1; i++) {
      await fireEvent.click(nextBtn);
    }
    expect(img.getAttribute("src")).toBe(images[images.length - 1]);
    expect(nextBtn.disabled).toBe(true);
  });
});
