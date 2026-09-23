import '@testing-library/jest-dom/jest-globals';

import { render, fireEvent } from "@testing-library/vue";
import { describe, expect, it } from '@jest/globals';
import { screen } from "@testing-library/dom";

import Counter from "./App.vue";

describe('Counter', () => {
  it("starts at zero", () => {
    render(Counter);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  // Add tests until every hidden bug is caught.
});
