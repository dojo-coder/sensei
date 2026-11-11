The function `chunk<T>(list: T[], size: number): T[][]` in `chunk.ts` is already written and **correct**. This is the reverse of a usual challenge: write the **Jest tests** in `chunk.test.ts` that prove it works.

Your tests run against the real `chunk.ts` and against several hidden **buggy copies** of it (mutants). A strong test suite passes on the real one and fails on every buggy one.

### Rules & clarifications

- `chunk` splits `list` into **consecutive** chunks of `size` elements; the **last** chunk may be shorter.
- An **empty** list gives an empty array `[]`.
- `size` must be a **positive integer**; `0`, a negative number or a fraction throws a **`RangeError`**.
- Your tests must **pass** against the reference `chunk.ts` and **fail** against **every** hidden mutant.
- A single even split catches almost nothing: think about **boundaries**, **invalid sizes** and **empty input**.

### Examples

- `chunk([1, 2, 3, 4], 2)` returns `[[1, 2], [3, 4]]`
- `chunk([1, 2, 3, 4, 5], 2)` returns `[[1, 2], [3, 4], [5]]` _(the last chunk is shorter)_
- `chunk([], 3)` returns `[]`
- `chunk([1], 0)` throws `RangeError`
- `chunk([1, 2], 1.5)` throws `RangeError`
