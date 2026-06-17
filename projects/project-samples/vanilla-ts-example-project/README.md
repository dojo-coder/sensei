# Vanilla TypeScript Image Slider

A small Vanilla TypeScript + Vite sandbox project: a styled image slider with **Previous** / **Next** controls that disable at the first and last image, plus a position counter. No framework — just typed DOM rendering.

## Files

- `index.html` — Vite entry point with `<div id="app"></div>`
- `main.ts` — defines the image list and initializes the slider on `#app`
- `imageSlider.ts` — typed `createImageSlider(container, images)` rendering logic
- `style.css` — light styling

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (http://localhost:5173) and edit `main.ts` to use your own images.
