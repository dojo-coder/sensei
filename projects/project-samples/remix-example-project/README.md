# Remix Items App

A minimal but real [Remix](https://remix.run/) app built on Vite (JavaScript). It shows the core Remix data-loading flow end to end:

- **`app/root.jsx`** — the root document/layout. Wires up `<Meta />`, `<Links />`, `<Outlet />`, `<ScrollRestoration />`, and `<Scripts />`.
- **`app/routes/_index.jsx`** — the `/` route. Its `loader` returns a small list of items on the server; the component reads them with `useLoaderData` and renders the list.
- **`app/routes/api.items.jsx`** — a resource route at `/api/items`. It exports only a `loader` (no component), so it serves JSON directly.

## Run it

```bash
npm install
npm run dev
```

Then open the dev server URL (printed in the terminal, usually http://localhost:5173):

- `/` — the rendered items list
- `/api/items` — the same data as JSON

## Build for production

```bash
npm run build
npm start
```

## Try this

- Add a field to each item (e.g. `priority`) and surface it in both the index route and `/api/items`.
- Add a second route under `app/routes/` and link to it from the index page.
- Move the shared `ITEMS` array into its own module and import it from both routes.
