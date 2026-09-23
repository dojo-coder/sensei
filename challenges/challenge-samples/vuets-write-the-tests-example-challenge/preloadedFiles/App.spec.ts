import '@testing-library/jest-dom/jest-globals';

import { render } from "@testing-library/vue";
import { describe, expect, it } from '@jest/globals';
import { screen } from "@testing-library/dom";

import TodoList from "./App.vue";

describe('TodoList', () => {
  it("starts empty", () => {
    render(TodoList);
    expect(screen.getByText("Todos (0)")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  // Add tests until every hidden bug is caught.
});
