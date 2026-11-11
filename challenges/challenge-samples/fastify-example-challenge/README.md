Add a `GET /` route to the Fastify app, which answers with the plain text `Hello, World!`.

### Rules & clarifications

- The answer has status `200` and its body is exactly `Hello, World!`, with the capital letters, the comma and the exclamation mark.
- The body is plain text, not JSON: `{"message":"Hello, World!"}` is wrong.
- A route that is not defined answers status `404`; the framework does this on its own.
- Write the route in the function `buildApp()` in `src/app.ts`. The tests call `buildApp()` and send requests to the app without starting a server, so do not call `listen` in this file; `src/main.ts`, which starts the server, is read-only.

### Examples

- `GET /` answers status `200` and the text `Hello, World!`.
- `GET /unknown` answers status `404`.
