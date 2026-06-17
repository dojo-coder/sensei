Build a Remix + TypeScript index route at `app/routes/_index.tsx` that renders an `<h1>` element containing the text `Hello, World!`.

The seed ships:

- `app/routes/_index.tsx` — the `/` route component (this is the file you edit)
- `app/root.tsx` — the root layout (readonly)
- `vite.config.js` — already configured with the Remix Vite plugin (readonly)

## Expected output

```tsx
export default function Index() {
  return <h1>Hello, World!</h1>;
}
```

No `loader` / `action` is needed for this challenge — a plain React component is enough.
