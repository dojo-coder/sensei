# SolidJS Image Slider

A small SolidJS + Vite sandbox project: a styled image slider with **Previous** / **Next** controls that disable at the first and last image, plus a position counter.

## Files

- `index.html` — Vite entry point
- `index.jsx` — mounts `<App />` with Solid's `render`
- `App.jsx` — holds the image list and renders the slider
- `ImageSlider.jsx` — the reusable slider component (`createSignal` + props)

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (http://localhost:5173) and edit `App.jsx` to use your own images.
