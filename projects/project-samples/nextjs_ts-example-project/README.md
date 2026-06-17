# Next.js TypeScript Items App

A minimal Next.js (App Router) sandbox in TypeScript. The home page renders a typed
list of items, and a Route Handler serves the same items as JSON.

## Files

- `app/layout.tsx` — root layout wrapping `<html><body>`
- `app/page.tsx` — home page (Server Component) rendering the list of items
- `app/api/items/route.ts` — Route Handler at `/api/items` returning the items as JSON
- `app/items.ts` — the typed `Item` data shared by the page and the API

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (http://localhost:3000). Visit `/api/items` to see the JSON
response, and edit `app/items.ts` to change the data.
