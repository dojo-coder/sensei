import '@testing-library/jest-dom/jest-globals';
import * as React from "react";

import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import App from "./App";

describe("TodoList", () => {
  it("starts empty", () => {
    render(React.createElement(App));
    expect(screen.getByText("Todos (0)")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  // Add tests until every hidden bug is caught.
});
