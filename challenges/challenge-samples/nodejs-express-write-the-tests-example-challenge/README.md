The Express app in `app.js` is already written and **correct**. Write the **Jest tests** in `shipping.test.js` that prove it, calling the API through `supertest` like the starter test does.

`POST /shipping/quote` takes a JSON body such as `{ "weightKg": 2.5, "express": true }` and answers `{ "cost": 18 }`. Your tests run against the real `app.js` and against several hidden **buggy copies** of it (mutants). A strong test suite passes on the real one and fails on every buggy one.

### Rules & clarifications

- The first kilogram costs **5**, and every **started** kilogram after it costs **2** more, so `2.5` kg is charged as 3 kg.
- `express: true` **doubles** the cost. `express` is optional and defaults to `false`; any value other than `true` or `false` answers status `400`.
- `weightKg` must be a number **above 0** and **at most 30**. Anything else, including a missing body, answers status **`400`**.
- Your tests must **pass** against the reference `app.js` and **fail** against **every** hidden mutant.
- Test through HTTP with `request(app)`; you never need to start the server yourself. `index.js` starts it for the **preview** and the API tester, and `main.js` prints a few quotes for the **Run** button.
- A single happy-path quote catches almost nothing: think about **partial kilograms**, **express delivery** and the **weight limit**.

### Examples

- Input: `{ "weightKg": 1 }` → Output: status `200`, `{ "cost": 5 }`
- Input: `{ "weightKg": 2.5 }` → Output: status `200`, `{ "cost": 9 }` _(charged as 3 kg)_
- Input: `{ "weightKg": 2.5, "express": true }` → Output: status `200`, `{ "cost": 18 }`
- Input: `{ "weightKg": 30 }` → Output: status `200`, `{ "cost": 63 }`
- Input: `{ "weightKg": 30.5 }` → Output: status `400`
- Input: `{}` → Output: status `400`
