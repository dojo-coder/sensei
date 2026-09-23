The vanilla JavaScript counter in `counter.js` is already written and **correct**. Your task is the reverse of a usual challenge: write the **tests** in `counter.spec.js` (Jest and jsdom) that prove it works, the way the starter test does.

It renders the count and three buttons:

```html
<div id="app">
  <p>Count: 0</p>
  <button disabled>Decrement</button>
  <button>Increment</button>
  <button>Reset</button>
</div>
```

Your tests run against the real component and against several hidden **buggy copies** of it (mutants). A strong test suite passes on the real one and fails on every buggy one.

### Rules & clarifications

- The count starts at **0** and is shown as `Count: N`.
- **Increment** adds exactly **1**.
- **Decrement** subtracts **1** and is **disabled at 0**: the count never goes negative.
- **Reset** puts the count back to **0**, whatever it was.
- Your tests must **pass** against the reference component and **fail** against **every** hidden mutant.
- The vanilla template has no Testing Library: reset the page from `globalThis.htmlContent` (the contents of `index.html`) in a `beforeEach`, call `createCounter(document.getElementById("app"))`, and query the page with plain DOM calls such as `document.querySelector("p")`, as the starter test does.
- Checking the first `Count: 0` catches almost nothing: think about the **step size**, the **lower bound** and what **Reset** does after a **single** click.

### Examples

- Input: no clicks → Output: `Count: 0`, **Decrement** is disabled
- Input: click **Increment** → Output: `Count: 1`
- Input: click **Increment** twice, then **Decrement** → Output: `Count: 1`
- Input: click **Decrement** at 0 → Output: still `Count: 0`
- Input: click **Increment**, then **Reset** → Output: `Count: 0`
