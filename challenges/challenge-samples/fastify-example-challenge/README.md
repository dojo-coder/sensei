Register a `GET /` route on the Fastify app that returns the plain-text string `Hello, World!`.

The Fastify scaffolding is already wired:

- `src/main.ts` — calls `buildApp()` and listens on port 3000 (readonly)
- `src/app.ts` — exports `buildApp(): FastifyInstance` — **the file you edit**

Replace the TODO comment in `buildApp` with a `GET /` route handler that returns the literal string `'Hello, World!'`. Fastify auto-sets `Content-Type: text/plain` for string returns.

## Expected solution

```ts
import Fastify, { type FastifyInstance } from 'fastify';

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: false });

  app.get('/', async () => {
    return 'Hello, World!';
  });

  return app;
}
```

Tests use `app.inject({ method: 'GET', url: '/' })` to drive the handler without binding a port, then assert `response.body === 'Hello, World!'` and `statusCode === 200`. Always `await app.close()` in `afterEach` (already in the seeded test) to avoid port leaks across spec files.
