import "@testing-library/jest-dom/jest-globals";

import { render, fireEvent } from "@testing-library/vue";
import { describe, expect, it } from "@jest/globals";
import { screen } from "@testing-library/dom";

import ImageSlider from "./ImageSlider.vue";

describe("ImageSlider", () => {
  const images: string[] = [
    "https://i.imgur.com/rmydi2w.jpg",
    "https://i.imgur.com/rAFqZiM.jpg",
    "https://i.imgur.com/Fpw5KKY.jpg",
    "https://i.imgur.com/IbYRmoW.jpg",
    "https://i.imgur.com/9poVrgA.jpg",
  ];

  const defaultProps: { images: string[] } = {
    images,
  };

it("displays the first image", () => {
    render(ImageSlider, { props: defaultProps });
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", images[0]);
  });

  // should have the previous button disabled initially
  it("has the previous button initially disabled", () => {
    render(ImageSlider, { props: defaultProps });
    const prevBtn = screen.getByText("Previous");
    expect(prevBtn).toBeDisabled();
  });

  // clicking on next button should show the next image
  it("show the next image when clicking on the next button", async () => {
    render(ImageSlider, { props: defaultProps });
    const nextBtn = screen.getByText("Next");
    const img = screen.getByRole("img");

    await fireEvent.click(nextBtn);
    expect(img).toHaveAttribute("src", images[1]);
  });

  it("show the previous image when clicking on the previous button", async () => {
    render(ImageSlider, { props: defaultProps });
    const prevBtn = screen.getByText("Previous");
    const nextBtn = screen.getByText("Next");
    const img = screen.getByRole("img");

    // First go to second image
    await fireEvent.click(nextBtn);
    expect(img).toHaveAttribute("src", images[1]);

    // Then go back to first image
    await fireEvent.click(prevBtn);
    expect(img).toHaveAttribute("src", images[0]);
  });

  // the prev button should be enabled if the current image is not the first
  it("enables the previous button if current image is not the first", async () => {
    render(ImageSlider, { props: defaultProps });
    const nextBtn = screen.getByText("Next");
    const prevBtn = screen.getByText("Previous");

    await fireEvent.click(nextBtn);
    expect(prevBtn).not.toBeDisabled();
  });

  // on reaching back to the first image the prev button should get disabled
  it("disables previous button when clicking previous button and the first image is displayed", async () => {
    render(ImageSlider, { props: defaultProps });
    const nextBtn = screen.getByText("Next");
    const prevBtn = screen.getByText("Previous");
    const img = screen.getByRole("img");

    await fireEvent.click(nextBtn);
    expect(img).toHaveAttribute("src", images[1]);
    expect(prevBtn).not.toBeDisabled();

    await fireEvent.click(prevBtn);
    expect(img).toHaveAttribute("src", images[0]);
    expect(prevBtn).toBeDisabled();
  });

  // when reaching the end of the images list the next button should be disabled
  it("disables the next button when reaching the last image in images list", async () => {
    render(ImageSlider, { props: defaultProps });
    const nextBtn = screen.getByText("Next");

    // Navigate to the last image
    for (let i = 0; i < images.length - 1; i++) {
      await fireEvent.click(nextBtn);
    }

    expect(nextBtn).toBeDisabled();
  });
});
