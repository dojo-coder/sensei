Build a Next.js App Router page at `/` that renders an `<h1>` element containing the text `Hello, World!`.

The seed ships an App Router project structure under `src/app/`:

- `src/app/page.jsx` — the route component (this is the file you edit)
- `src/app/layout.jsx` — the root layout (already wraps `<html><body>{children}</body></html>`)
- `next.config.js` — ESM Next config (already set)

Replace the body of `Page` in `src/app/page.jsx` so the rendered output contains exactly the text `Hello, World!` inside a single `<h1>` element.

## Expected output

```jsx
export default function Page() {
  return <h1>Hello, World!</h1>;
}
```

No client-side interactivity is needed — the page can be a Server Component (no `'use client'` directive).
