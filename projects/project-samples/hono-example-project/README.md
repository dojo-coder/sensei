# Hono Items API

A small, runnable [Hono](https://hono.dev) + TypeScript HTTP API sandbox. It exposes a
greeting route plus an in-memory `items` collection, served with `@hono/node-server`.

## Files

- `src/app.ts` — exports the `Hono` instance and registers the routes (the file you edit)
- `src/main.ts` — boots the server via `@hono/node-server` on port 3000

## Routes

- `GET /` — plain-text greeting
- `GET /items` — returns the full list of items as JSON
- `GET /items/:id` — returns a single item, or `404` if no item matches the id

## Run locally

```bash
npm install
npm start
```

The server starts on http://localhost:3000. Try it out:

```bash
curl http://localhost:3000/
curl http://localhost:3000/items
curl http://localhost:3000/items/1
```

Use `npm run dev` to restart automatically on file changes.
