import '@testing-library/jest-dom/jest-globals';

import { render, fireEvent } from "@testing-library/vue";
import { describe, expect, it } from '@jest/globals';
import { screen } from "@testing-library/dom";

import TodoList from "./App.vue";

const input = (): HTMLInputElement => screen.getByPlaceholderText("What needs to be done?") as HTMLInputElement;
const items = (): string[] => screen.queryAllByRole("listitem").map((node) => node.textContent ?? "");

async function add(text: string): Promise<void> {
  await fireEvent.update(input(), text);
  await fireEvent.click(screen.getByRole("button", { name: "Add" }));
}

describe('TodoList (reference suite)', () => {
  it("starts empty", () => {
    render(TodoList);
    expect(screen.getByText("Todos (0)")).toBeInTheDocument();
    expect(items()).toEqual([]);
  });

  it("adds a trimmed todo and counts it", async () => {
    render(TodoList);
    await add("  Buy milk  ");
    expect(items()).toEqual(["Buy milk"]);
    expect(screen.getByText("Todos (1)")).toBeInTheDocument();
  });

  it("clears the input after adding", async () => {
    render(TodoList);
    await add("Buy milk");
    expect(input().value).toBe("");
  });

  it("ignores blank todos", async () => {
    render(TodoList);
    await add("");
    await add("   ");
    expect(items()).toEqual([]);
    expect(screen.getByText("Todos (0)")).toBeInTheDocument();
  });

  it("ignores duplicates regardless of letter case", async () => {
    render(TodoList);
    await add("Buy milk");
    await add("buy MILK");
    expect(items()).toEqual(["Buy milk"]);
    expect(screen.getByText("Todos (1)")).toBeInTheDocument();
  });
});
