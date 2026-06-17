# SolidJS TypeScript Image Slider

A small SolidJS + TypeScript + Vite sandbox project: a styled image slider with **Previous** / **Next** controls that disable at the first and last image, plus a position counter. Uses Solid's `createSignal` for state and a typed `images: string[]` prop.

## Files

- `index.html` — Vite entry point
- `index.tsx` — mounts `<App />`
- `App.tsx` — holds the image list and renders the slider
- `ImageSlider.tsx` — the reusable slider component (signal + typed props)

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (http://localhost:5173) and edit `App.tsx` to use your own images.
