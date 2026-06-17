# NestJS Items API

A minimal but real **NestJS** HTTP API sandbox. It exposes a greeting endpoint and an in-memory items resource, wired the idiomatic NestJS way (module + controller + service).

## Endpoints

- `GET /` — returns a greeting (`Hello, World!`)
- `GET /items` — returns the in-memory list of items
- `GET /items/:id` — returns a single item by id (404 if not found)

## Files

- `src/main.ts` — bootstraps the app on port 3000
- `src/app.module.ts` — root module, imports `ItemsModule`
- `src/app.controller.ts` / `src/app.service.ts` — the `GET /` greeting
- `src/items/items.module.ts` — the items feature module
- `src/items/items.controller.ts` — handles `GET /items` and `GET /items/:id`
- `src/items/items.service.ts` — in-memory item store
- `src/items/item.interface.ts` — the `Item` shape

## Run locally

```bash
npm install
npm run start
```

Then open http://localhost:3000 (greeting) and http://localhost:3000/items.

For auto-reload during development:

```bash
npm run dev
```
