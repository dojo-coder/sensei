# Svelte Image Slider

A small Svelte + Vite sandbox project: a styled image slider with **Previous** / **Next** controls that disable at the first and last image, plus a current/total position counter.

## Files

- `index.html` — Vite entry point
- `main.js` — mounts `<App />`
- `App.svelte` — holds the image list and renders the slider
- `ImageSlider.svelte` — the reusable slider component (state + props)

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (http://localhost:5173) and edit `App.svelte` to use your own images.
