import { render, screen, fireEvent, cleanup } from "@testing-library/svelte";

import App from "./App.svelte";

afterEach(() => cleanup());

const button = (name) => screen.getByRole("button", { name });

describe("Counter (reference suite)", () => {
  test("starts at zero", () => {
    render(App);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  test("increments by one", async () => {
    render(App);
    await fireEvent.click(button("Increment"));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  test("decrements by one", async () => {
    render(App);
    await fireEvent.click(button("Increment"));
    await fireEvent.click(button("Increment"));
    await fireEvent.click(button("Decrement"));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  test("never goes below zero", async () => {
    render(App);
    expect(button("Decrement")).toBeDisabled();
    await fireEvent.click(button("Decrement"));
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
    await fireEvent.click(button("Increment"));
    expect(button("Decrement")).not.toBeDisabled();
  });

  test("resets to zero after a single increment", async () => {
    render(App);
    await fireEvent.click(button("Increment"));
    await fireEvent.click(button("Reset"));
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });
});
