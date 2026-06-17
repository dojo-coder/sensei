Register a `GET /` route on the Hono app that returns the plain-text string `Hello, World!`.

The Hono scaffolding is already wired:

- `src/main.ts` — starts the server via `@hono/node-server` on port 3000 (readonly)
- `src/app.ts` — exports the `Hono` instance — **the file you edit**

Replace the TODO comment in `src/app.ts` with a `GET /` route handler that returns `c.text('Hello, World!')`. Remember: Hono handlers MUST `return` the `c.text()` / `c.json()` call — calling without returning sends an empty response.

## Expected solution

```ts
import { Hono } from 'hono';

export const app = new Hono();

app.get('/', (c) => c.text('Hello, World!'));
```

Tests use `app.request('/')` (Hono's built-in request injector — no server boot needed) and assert `response.status === 200` and `await response.text() === 'Hello, World!'`.
