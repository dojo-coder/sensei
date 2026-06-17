Build a Remix index route at `app/routes/_index.jsx` that renders an `<h1>` element containing the text `Hello, World!`.

The seed ships:

- `app/routes/_index.jsx` — the `/` route component (this is the file you edit)
- `app/root.jsx` — the root layout (readonly, already wires `<Outlet />`, `<Links />`, `<Scripts />`)
- `vite.config.js` — already configured with the Remix Vite plugin (readonly)

## Expected output

```jsx
export default function Index() {
  return <h1>Hello, World!</h1>;
}
```

No `loader` / `action` is needed for this challenge — a plain React component is enough.
