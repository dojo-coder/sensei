The Vue + TypeScript todo list in `App.vue` is already written and **correct**. Your task is the reverse of a usual challenge: write the **tests** in `App.spec.ts` (Jest and `@testing-library/vue`) that prove it works, the way the starter test does.

It renders a heading, an input, an **Add** button and the list; after adding `Buy milk` it looks like this:

```html
<div>
  <h1>Todos (1)</h1>
  <input placeholder="What needs to be done?" />
  <button>Add</button>
  <ul>
    <li>Buy milk</li>
  </ul>
</div>
```

Your tests run against the real component and against several hidden **buggy copies** of it (mutants). A strong test suite passes on the real one and fails on every buggy one.

### Rules & clarifications

- The heading shows how many todos there are: `Todos (N)`.
- **Add** trims the text and appends it to the **end** of the list.
- **Blank** input, empty or only spaces, adds nothing.
- A todo that already exists, **ignoring letter case**, is not added again.
- After a todo is added the input is **cleared**.
- Your tests must **pass** against the reference component and **fail** against **every** hidden mutant.
- Find elements the way a user does, by text or role, for example `getByRole("button", { name: "Add" })`.
- Checking the empty list catches almost nothing: think about **blank input**, **duplicates** and the **input after a todo is added**.

### Examples

- Input: add `"  Buy milk  "` → Output: list `["Buy milk"]`, heading `Todos (1)`
- Input: add `"Buy milk"` → Output: the input is empty again
- Input: add `""`, then `"   "` → Output: list `[]`, heading `Todos (0)`
- Input: add `"Buy milk"`, then `"buy MILK"` → Output: list `["Buy milk"]` _(duplicates ignore case)_
- Input: add `"Buy milk"`, then `"Walk dog"` → Output: list `["Buy milk", "Walk dog"]`
