import { render, screen, fireEvent } from "@testing-library/svelte";
import { describe, expect, it, beforeEach } from "@jest/globals";
import ImageSlider from "./ImageSlider.svelte";

describe("ImageSlider", () => {
  let prevBtn, nextBtn, img;
  const images = [
    "https://i.imgur.com/rmydi2w.jpg",
    "https://i.imgur.com/rAFqZiM.jpg",
    "https://i.imgur.com/Fpw5KKY.jpg",
    "https://i.imgur.com/IbYRmoW.jpg",
    "https://i.imgur.com/9poVrgA.jpg",
  ];

  beforeEach(() => {
    render(ImageSlider, { props: { images } });
    prevBtn = screen.getByText("Previous");
    nextBtn = screen.getByText("Next");
    img = screen.getByRole("img");
  });

  it("displays the first image", () => {
    expect(img).toHaveAttribute("src", images[0]);
  });

  it("has the previous button initially disabled", () => {
    expect(prevBtn).toBeDisabled();
  });

  it("show the next image when clicking on the next button", async () => {
    await fireEvent.click(nextBtn);
    expect(img).toHaveAttribute("src", images[1]);
  });

  it("show the previous image when clicking on the previous button", async () => {
    // First go to second image
    await fireEvent.click(nextBtn);
    // Then go back to first image
    await fireEvent.click(prevBtn);
    expect(img).toHaveAttribute("src", images[0]);
  });

  it("disables previous button when clicking previous button and the first image is displayed", async () => {
    // go to the second image
    await fireEvent.click(nextBtn);
    expect(img).toHaveAttribute("src", images[1]);
    expect(prevBtn).not.toBeDisabled();

    // back to the first image
    await fireEvent.click(prevBtn);
    expect(img).toHaveAttribute("src", images[0]);
    expect(prevBtn).toBeDisabled(); // disabled on first image
  });

  it("disables the next button when reaching the last image in images list", async () => {
    for (let i = 0; i < images.length - 1; i++) {
      await fireEvent.click(nextBtn);
    }
    expect(img).toHaveAttribute("src", images[images.length - 1]);
    expect(nextBtn).toBeDisabled(); // disabled on last image
  });
});
