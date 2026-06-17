# SvelteKit TypeScript Items App

A minimal but real SvelteKit + TypeScript sandbox. It renders a typed list of
items from a server-side `load` and exposes the same data as JSON from an API
route.

## Files

- `src/app.html` — the HTML shell SvelteKit hydrates into
- `src/app.d.ts` — ambient `App` namespace types
- `src/lib/items.ts` — the typed `Item` model and the shared `getItems()` source
- `src/routes/+page.server.ts` — server `load` that feeds items to the page
- `src/routes/+page.svelte` — the page (Svelte 5 runes, `<script lang="ts">`)
- `src/routes/api/items/+server.ts` — `GET /api/items` returning items as JSON

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL. Visit `/api/items` to see the JSON endpoint, and edit
`src/lib/items.ts` to change the data that both the page and the API serve.
