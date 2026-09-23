The SolidJS counter in `App.jsx` is already written and **correct**. Your task is the reverse of a usual challenge: write the **tests** in `App.spec.jsx` (Vitest and `@solidjs/testing-library`) that prove it works, the way the starter test does.

It renders the count and three buttons:

```html
<div>
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
- Find elements the way a user does, by text or role, for example `getByRole("button", { name: "Increment" })`.
- Checking the first `Count: 0` catches almost nothing: think about the **step size**, the **lower bound** and what **Reset** does after a **single** click.

### Examples

- Input: no clicks → Output: `Count: 0`, **Decrement** is disabled
- Input: click **Increment** → Output: `Count: 1`
- Input: click **Increment** twice, then **Decrement** → Output: `Count: 1`
- Input: click **Decrement** at 0 → Output: still `Count: 0`
- Input: click **Increment**, then **Reset** → Output: `Count: 0`
