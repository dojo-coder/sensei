The Hono app in `src/app.ts` is already written and **correct**. Write the **Vitest tests** in `slug.test.ts` that prove it, calling the route with `app.request()` like the starter test does.

`GET /slug?text=Hello, World!` answers `{ "slug": "hello-world" }`. Your tests run against the real `src/app.ts` and against several hidden **buggy copies** of it (mutants). A strong test suite passes on the real one and fails on every buggy one.

### Rules & clarifications

- The slug is the text **trimmed** and **lowercased**.
- Every run of characters that are not `a-z` or `0-9` becomes **one** dash.
- The slug never **starts or ends** with a dash.
- A missing or **blank** `text` parameter answers status **`400`**.
- Your tests must **pass** against the reference code and **fail** against **every** hidden mutant.
- Encode the text with `encodeURIComponent` when you build the URL, so spaces and punctuation reach the route intact.
- A single assertion on `hello world` catches almost nothing: think about **casing**, **punctuation at the edges** and the requests that must be **rejected**.

### Examples

- Input: `GET /slug?text=hello world` → Output: status `200`, `{ "slug": "hello-world" }`
- Input: `GET /slug?text=DojoCode` → Output: status `200`, `{ "slug": "dojocode" }`
- Input: `GET /slug?text=  Hello, World!  ` → Output: status `200`, `{ "slug": "hello-world" }`
- Input: `GET /slug?text=a---b` → Output: status `200`, `{ "slug": "a-b" }`
- Input: `GET /slug` → Output: status `400`
- Input: `GET /slug?text=   ` → Output: status `400`
