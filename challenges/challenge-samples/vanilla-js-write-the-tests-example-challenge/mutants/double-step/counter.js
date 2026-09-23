export function createCounter(root) {
  let count = 0;

  const display = document.createElement("p");
  const decrementButton = document.createElement("button");
  const incrementButton = document.createElement("button");
  const resetButton = document.createElement("button");

  decrementButton.textContent = "Decrement";
  incrementButton.textContent = "Increment";
  resetButton.textContent = "Reset";

  function render() {
    display.textContent = `Count: ${count}`;
    decrementButton.disabled = count === 0;
  }

  incrementButton.addEventListener("click", () => {
    count += 2;
    render();
  });

  decrementButton.addEventListener("click", () => {
    if (count > 0) count -= 1;
    render();
  });

  resetButton.addEventListener("click", () => {
    count = 0;
    render();
  });

  root.append(display, decrementButton, incrementButton, resetButton);
  render();
}
