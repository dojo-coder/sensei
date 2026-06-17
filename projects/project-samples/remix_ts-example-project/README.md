# Remix TypeScript Items App

A minimal but real Remix (Vite) + TypeScript sandbox. The index route loads a small
list of items on the server with a typed `loader` and renders it with `useLoaderData`.
A matching resource route exposes the same data as JSON.

## Files

- `app/root.tsx` — the root document/layout (`<html>`, `<Meta>`, `<Links>`, `<Outlet>`, `<Scripts>`)
- `app/routes/_index.tsx` — the `/` route: typed `loader` + `useLoaderData` rendering the item list
- `app/routes/api.items.tsx` — the `/api/items` resource route (loader returning JSON)
- `app/data/items.ts` — shared, typed item data used by both routes
- `vite.config.ts` — Vite + Remix plugin
- `tsconfig.json` — TypeScript config (with the `~/*` → `app/*` path alias)

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (default `http://localhost:3000`).

- `/` renders the items list.
- `/api/items` returns the same items as JSON.

## Type checking

```bash
npm run typecheck
```
