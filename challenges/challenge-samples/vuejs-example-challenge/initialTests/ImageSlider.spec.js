import { render, screen, fireEvent } from "@testing-library/vue";
import ImageSlider from "./ImageSlider.vue";

describe("ImageSlider", () => {
  const images = [
    "https://i.imgur.com/rmydi2w.jpg",
    "https://i.imgur.com/rAFqZiM.jpg",
    "https://i.imgur.com/Fpw5KKY.jpg",
    "https://i.imgur.com/IbYRmoW.jpg",
    "https://i.imgur.com/9poVrgA.jpg",
  ];

  const defaultProps = {
    images,
  };

  // should show the first image
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
});
