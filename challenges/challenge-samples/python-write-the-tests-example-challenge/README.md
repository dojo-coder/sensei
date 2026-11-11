The function `clamp(value, low, high)` in `clamp.py` is already written and **correct**. This is the reverse of a usual challenge: write the **pytest tests** in `test_clamp.py` that prove it works, using the `@m.describe` / `@m.it` style of the starter test.

Your tests run against the real `clamp.py` and against several hidden **buggy copies** of it (mutants). A strong test suite passes on the real one and fails on every buggy one.

### Rules & clarifications

- `clamp` returns `value` limited to the **inclusive** range `[low, high]`.
- A value **below** `low` gives `low`; a value **above** `high` gives `high`.
- `low` equal to `high` is allowed; `low` **greater** than `high` raises a **`ValueError`**.
- Your tests must **pass** against the reference `clamp.py` and **fail** against **every** hidden mutant.
- A single value inside the range catches almost nothing: think about **both boundaries** and **invalid ranges**.

### Examples

- `clamp(5, 0, 10)` returns `5`
- `clamp(-5, 0, 10)` returns `0`
- `clamp(15, 0, 10)` returns `10`
- `clamp(0, 0, 10)` returns `0` _(the boundaries are inside the range)_
- `clamp(7, 3, 3)` returns `3`
- `clamp(5, 10, 0)` raises `ValueError`
