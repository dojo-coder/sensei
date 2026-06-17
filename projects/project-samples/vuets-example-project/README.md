# Vue TypeScript Image Slider

A small Vue 3 + TypeScript + Vite sandbox project: a styled image slider with **Previous** / **Next** controls that disable at the first and last image, plus a position counter.

## Files

- `index.html` — Vite entry point
- `main.ts` — mounts `<App />`
- `App.vue` — holds the image list and renders the slider
- `ImageSlider.vue` — the reusable slider component (typed `images` prop + reactive state)

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (http://localhost:5173) and edit `App.vue` to use your own images.
