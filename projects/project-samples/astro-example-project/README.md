# Astro Items Site

A minimal but real [Astro](https://astro.build) sandbox: an index page that
renders a list of items defined in frontmatter, plus a JSON API endpoint that
serves the same items.

## Files

- `src/data/items.js` — the shared items list (used by the page and the API)
- `src/pages/index.astro` — renders the items as an HTML list
- `src/pages/api/items.json.js` — Astro endpoint serving the items at `/api/items.json`
- `astro.config.mjs` — Astro configuration

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (default <http://localhost:4321>):

- `/` — the items page
- `/api/items.json` — the items as JSON

Edit `src/data/items.js` to change the list in both places at once.
