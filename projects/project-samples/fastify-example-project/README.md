# Fastify Items API

A minimal but real Fastify + TypeScript HTTP API sandbox. It exposes a greeting route and a couple of in-memory item endpoints, built with the idiomatic `buildApp()` factory pattern.

## Routes

- `GET /` — plain-text greeting (`Hello, World!`)
- `GET /items` — returns the full list of in-memory items
- `GET /items/:id` — returns a single item by id, or `404` if it doesn't exist

## Files

- `src/app.ts` — `buildApp()` registers the routes and returns the `FastifyInstance`
- `src/server.ts` — entry point; calls `buildApp()` and `app.listen(...)` on port `3000`
- `tsconfig.json` — TypeScript configuration

## Run locally

```bash
npm install
npm start
```

The server listens on http://localhost:3000. Try:

```bash
curl http://localhost:3000/
curl http://localhost:3000/items
curl http://localhost:3000/items/1
```

For live reload during development, use `npm run dev`.
