# Next.js Items App

A minimal but real Next.js app using the **App Router** in **JavaScript**.

- `app/page.jsx` — home page (Server Component) that renders a small list of items server-side.
- `app/api/items/route.js` — a Route Handler that returns the items as JSON at `GET /api/items`.
- `app/items.js` — shared in-memory data used by both the page and the API route.
- `app/layout.jsx` — root layout.

## Run it

```bash
npm install
npm run dev
```

Then open:

- http://localhost:3000 — the items list
- http://localhost:3000/api/items — the same items as JSON

## Next steps

- Replace `app/items.js` with a real data source (database or external API).
- Have the page `fetch('/api/items')` instead of importing the data directly.
- Add more routes under `app/`.
