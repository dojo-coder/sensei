Render an `<h1>` element containing the text `Hello, World!`.

The seeded `App.tsx` component is the entry point — replace its body so the rendered output matches the expected text exactly (case sensitive, including the comma and exclamation mark).

## Expected output

```tsx
<h1>Hello, World!</h1>
```

The `main.tsx` entry file already mounts `<App />` into `#root` — you only need to edit `App.tsx`. SolidJS components are plain functions that return JSX; no signals or effects are required for this challenge. The component should be typed as `Component<{}>` or simply use no type annotation.
