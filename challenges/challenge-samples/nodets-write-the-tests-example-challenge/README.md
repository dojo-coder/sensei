The function `chunk<T>(list: T[], size: number): T[][]` in `chunk.ts` is already written and **correct**. Your task is the reverse of a usual challenge: write the **Jest tests** in `chunk.test.ts` that prove it works.

Your tests run against the real `chunk.ts` and against several hidden **buggy copies** of it (mutants). A strong test suite passes on the real one and fails on every buggy one.

### Rules & clarifications

- `chunk` splits `list` into **consecutive** chunks of `size` elements; the **last** chunk may be shorter.
- An **empty** list gives an empty array `[]`.
- `size` must be a **positive integer**; `0`, a negative number or a fraction throws a **`RangeError`**.
- Your tests must **pass** against the reference `chunk.ts` and **fail** against **every** hidden mutant.
- A single even split catches almost nothing: think about **boundaries**, **invalid sizes** and **empty input**.

### Examples

- Input: `chunk([1, 2, 3, 4], 2)` → Output: `[[1, 2], [3, 4]]`
- Input: `chunk([1, 2, 3, 4, 5], 2)` → Output: `[[1, 2], [3, 4], [5]]` _(the last chunk is shorter)_
- Input: `chunk([], 3)` → Output: `[]`
- Input: `chunk([1], 0)` → Output: throws `RangeError`
- Input: `chunk([1, 2], 1.5)` → Output: throws `RangeError`
