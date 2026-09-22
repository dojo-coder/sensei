import { render, screen, fireEvent, cleanup } from "@testing-library/svelte";

import App from "./App.svelte";

afterEach(() => cleanup());

describe("Counter", () => {
  test("starts at zero", () => {
    render(App);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  // Add tests until every hidden bug is caught.
});
