Add a `GET /` route to the Hono app, which answers with the plain text `Hello, World!`.

### Rules & clarifications

- The answer has status `200` and its body is exactly `Hello, World!`, with the capital letters, the comma and the exclamation mark.
- The body is plain text, not JSON: `{"message":"Hello, World!"}` is wrong.
- A route that is not defined answers status `404`; the framework does this on its own.
- In Hono, a handler must return its response: write `return c.text(...)`. Without `return`, the answer is empty.
- Write the route in `src/app.ts`. The tests send requests to the exported `app` without starting a server; `src/main.ts`, which starts the server, is read-only.

### Examples

- `GET /` answers status `200` and the text `Hello, World!`.
- `GET /unknown` answers status `404`.
