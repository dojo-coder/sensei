# SvelteKit Items App

A minimal but real [SvelteKit](https://svelte.dev/docs/kit) (JavaScript, Svelte 5)
sandbox that demonstrates the three core building blocks of a full-stack
SvelteKit route:

- **`src/routes/+page.svelte`** — the page component. It receives `data` from the
  server load function and renders a small list of items.
- **`src/routes/+page.server.js`** — a server-side `load` function that supplies
  the items to the page.
- **`src/routes/api/items/+server.js`** — a `GET` endpoint that returns the same
  items as JSON at `/api/items`.

The item data lives in `src/lib/items.js` and is shared by both the page load
function and the API endpoint.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (default http://localhost:5173):

- `/` — the rendered items page
- `/api/items` — the JSON API

## Scripts

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the Vite dev server         |
| `npm run build`   | Build for production              |
| `npm run preview` | Preview the production build      |

## Stack

- SvelteKit `^2.59.1`
- Svelte `^5.0.0`
- Vite `^5.0.0`
- `@sveltejs/adapter-auto`
