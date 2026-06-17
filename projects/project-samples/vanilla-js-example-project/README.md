# Vanilla JS Image Slider

A small Vanilla JavaScript + Vite sandbox project: a styled image slider with **Previous** / **Next** controls that disable at the first and last image, plus a `current / total` position counter. No framework.

## Files

- `index.html` — Vite entry point (`<div id="app">`)
- `main.js` — defines the image list and mounts the slider on `#app`
- `imageSlider.js` — the reusable slider logic (DOM creation, state index, prev/next, disabled handling, counter)
- `style.css` — light styling (centered, rounded image with shadow)

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (http://localhost:5173) and edit `main.js` to use your own images.
