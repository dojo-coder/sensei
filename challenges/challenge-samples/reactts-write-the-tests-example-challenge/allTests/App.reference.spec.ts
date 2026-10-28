import '@testing-library/jest-dom/jest-globals';
import * as React from "react";

import { describe, expect, it } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import App from "./App";

const input = (): HTMLInputElement => screen.getByPlaceholderText("What needs to be done?") as HTMLInputElement;
const items = (): string[] => screen.queryAllByRole("listitem").map((node) => node.textContent ?? "");

function add(text: string): void {
  fireEvent.change(input(), { target: { value: text } });
  fireEvent.click(screen.getByRole("button", { name: "Add" }));
}

describe("TodoList (reference suite)", () => {
  it("starts empty", () => {
    render(React.createElement(App));
    expect(screen.getByText("Todos (0)")).toBeInTheDocument();
    expect(items()).toEqual([]);
  });

  it("adds a trimmed todo and counts it", () => {
    render(React.createElement(App));
    add("  Buy milk  ");
    expect(items()).toEqual(["Buy milk"]);
    expect(screen.getByText("Todos (1)")).toBeInTheDocument();
  });

  it("clears the input after adding", () => {
    render(React.createElement(App));
    add("Buy milk");
    expect(input().value).toBe("");
  });

  it("ignores blank todos", () => {
    render(React.createElement(App));
    add("");
    add("   ");
    expect(items()).toEqual([]);
    expect(screen.getByText("Todos (0)")).toBeInTheDocument();
  });

  it("ignores duplicates regardless of letter case", () => {
    render(React.createElement(App));
    add("Buy milk");
    add("buy MILK");
    expect(items()).toEqual(["Buy milk"]);
    expect(screen.getByText("Todos (1)")).toBeInTheDocument();
  });
});
