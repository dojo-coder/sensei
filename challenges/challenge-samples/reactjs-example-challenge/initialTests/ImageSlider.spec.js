import "@testing-library/jest-dom/jest-globals";
import * as React from "react";

import { describe, expect, it, beforeEach } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageSlider from "./ImageSlider.jsx";

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
    render(React.createElement(ImageSlider, { images }));
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
    fireEvent.click(nextBtn);
    expect(img).toHaveAttribute("src", images[1]);
  });

  it("show the previous image when clicking on the previous button", async () => {
    // First go to second image
    fireEvent.click(nextBtn);
    // Then go back to first image
    fireEvent.click(prevBtn);
    expect(img).toHaveAttribute("src", images[0]);
  });
});
