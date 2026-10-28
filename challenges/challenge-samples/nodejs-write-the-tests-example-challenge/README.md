The function `sum(a, b)` in `sum.js` is already written and **correct**. Your task is the reverse of a usual challenge: write the **Jest tests** in `sum.test.js` that prove it works.

Your tests run against the real `sum.js` and against several hidden **buggy copies** of it (mutants). A strong test suite passes on the real one and fails on every buggy one.

### Rules & clarifications

- `sum(a, b)` returns `a + b` when **both** arguments are numbers.
- It throws a **`TypeError`** when either argument is not a number, including numeric strings such as `"1"` and `undefined`.
- Your tests must **pass** against the reference `sum.js`.
- Your tests must **fail** against **every** hidden mutant; each one breaks one rule above.
- Only your test file is graded: `sum.js` is swapped for each mutant when your tests run.
- A single assertion on `sum(1, 2)` catches almost nothing: cover **negative numbers** and **invalid input** too.

### Examples

- Input: `sum(1, 2)` → Output: `3`
- Input: `sum(-2, -3)` → Output: `-5`
- Input: `sum(-2, 5)` → Output: `3`
- Input: `sum("1", 2)` → Output: throws `TypeError`
- Input: `sum(1, undefined)` → Output: throws `TypeError`
