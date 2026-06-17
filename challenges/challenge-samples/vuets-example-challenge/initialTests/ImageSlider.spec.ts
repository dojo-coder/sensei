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

  // should show the first image
  it("displays the first image", () => {
    render(ImageSlider, { props: defaultProps });
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img).toHaveAttribute("src", images[0]);
  });

  // should have the previous button disabled initially
  it("has the previous button initially disabled", () => {
    render(ImageSlider, { props: defaultProps });
    const prevBtn = screen.getByText("Previous") as HTMLButtonElement;
    expect(prevBtn).toBeDisabled();
  });

  // clicking on next button should show the next image
  it("shows the next image when clicking on the next button", async () => {
    render(ImageSlider, { props: defaultProps });
    const nextBtn = screen.getByText("Next") as HTMLButtonElement;
    const img = screen.getByRole("img") as HTMLImageElement;

    await fireEvent.click(nextBtn);
    expect(img).toHaveAttribute("src", images[1]);
  });

  it("shows the previous image when clicking on the previous button", async () => {
    render(ImageSlider, { props: defaultProps });
    const prevBtn = screen.getByText("Previous") as HTMLButtonElement;
    const nextBtn = screen.getByText("Next") as HTMLButtonElement;
    const img = screen.getByRole("img") as HTMLImageElement;

    // First go to second image
    await fireEvent.click(nextBtn);
    expect(img).toHaveAttribute("src", images[1]);

    // Then go back to first image
    await fireEvent.click(prevBtn);
    expect(img).toHaveAttribute("src", images[0]);
  });
});
