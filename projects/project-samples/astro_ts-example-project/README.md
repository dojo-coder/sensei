# Astro TypeScript Items Site

A minimal Astro + TypeScript sandbox. The index page renders a typed list of
items in the frontmatter, and a TypeScript API endpoint serves the same data as
JSON.

## Files

- `src/data/items.ts` — the typed `Item` interface and the shared `items` data
- `src/pages/index.astro` — renders the typed list of items
- `src/pages/api/items.json.ts` — `GET` API route returning the items as JSON
- `astro.config.mjs` — Astro configuration
- `tsconfig.json` — extends Astro's strict TypeScript config

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL. The page is at `/` and the JSON endpoint at
`/api/items.json`. Edit `src/data/items.ts` to change the list.
