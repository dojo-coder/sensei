The Fastify app in `src/app.ts` is already written and **correct**. Write the **Vitest tests** in `cart.test.ts` that prove it, calling the route with `app.inject()` like the starter test does.

`POST /cart/total` takes a JSON body such as `{ "items": [{ "price": 2.5, "qty": 2 }] }` and answers `{ "total": 5 }`. Your tests run against the real `src/app.ts` and against several hidden **buggy copies** of it (mutants). A strong test suite passes on the real one and fails on every buggy one.

### Rules & clarifications

- The total is the sum of `price * qty` over **all** items, **rounded to cents**.
- A missing or **empty** `items` array answers status **`400`**.
- An item with a **negative price**, or a `qty` that is not a whole number of **at least 1**, answers status `400`.
- Your tests must **pass** against the reference code and **fail** against **every** hidden mutant.
- Build a fresh app with `buildApp()` for each test and close it afterwards, as the starter test does.
- A single two-item cart catches almost nothing: think about **single items**, **quantities**, **rounding** and the requests that must be **rejected**.

### Examples

- Input: `{ "items": [{ "price": 2.5, "qty": 2 }, { "price": 1.25, "qty": 4 }] }` → Output: status `200`, `{ "total": 10 }`
- Input: `{ "items": [{ "price": 3, "qty": 1 }] }` → Output: status `200`, `{ "total": 3 }`
- Input: `{ "items": [{ "price": 0.1, "qty": 3 }] }` → Output: status `200`, `{ "total": 0.3 }` _(not 0.30000000000000004)_
- Input: `{ "items": [] }` → Output: status `400`
- Input: `{ "items": [{ "price": 2, "qty": 0 }] }` → Output: status `400`
- Input: `{ "items": [{ "price": -1, "qty": 1 }] }` → Output: status `400`
