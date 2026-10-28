export function createTodoList(root: HTMLElement): void {
  const items: string[] = [];

  const heading = document.createElement("h1");
  const input = document.createElement("input");
  const addButton = document.createElement("button");
  const list = document.createElement("ul");

  input.placeholder = "What needs to be done?";
  addButton.textContent = "Add";

  function render(): void {
    heading.textContent = `Todos (${items.length})`;
    list.replaceChildren(
      ...items.map((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        return li;
      })
    );
  }

  addButton.addEventListener("click", () => {
    const text = input.value.trim();

    if (text.length === 0) return;

    if (items.some((item) => item.toLowerCase() === text.toLowerCase())) return;

    items.push(text);
    
    render();
  });

  root.append(heading, input, addButton, list);
  render();
}
