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

- `GET /slug?text=hello world` answers status `200` and `{ "slug": "hello-world" }`
- `GET /slug?text=DojoCode` answers status `200` and `{ "slug": "dojocode" }`
- `GET /slug?text=  Hello, World!  ` answers status `200` and `{ "slug": "hello-world" }`
- `GET /slug?text=a---b` answers status `200` and `{ "slug": "a-b" }`
- `GET /slug` answers status `400`
- `GET /slug?text=   ` answers status `400`
