import '@testing-library/jest-dom/jest-globals';

import { render, fireEvent } from "@testing-library/vue";
import { describe, expect, it } from '@jest/globals';
import { screen } from "@testing-library/dom";

import Counter from "./App.vue";

const button = (name) => screen.getByRole("button", { name });

describe('Counter (reference suite)', () => {
  it("starts at zero", () => {
    render(Counter);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("increments by one", async () => {
    render(Counter);
    await fireEvent.click(button("Increment"));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  it("decrements by one", async () => {
    render(Counter);
    await fireEvent.click(button("Increment"));
    await fireEvent.click(button("Increment"));
    await fireEvent.click(button("Decrement"));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  it("never goes below zero", async () => {
    render(Counter);
    expect(button("Decrement")).toBeDisabled();
    await fireEvent.click(button("Decrement"));
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
    await fireEvent.click(button("Increment"));
    expect(button("Decrement")).not.toBeDisabled();
  });

  it("resets to zero after a single increment", async () => {
    render(Counter);
    await fireEvent.click(button("Increment"));
    await fireEvent.click(button("Reset"));
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });
});
