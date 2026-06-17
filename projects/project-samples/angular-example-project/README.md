# Angular Image Slider

A small Angular standalone-components sandbox: a styled image slider with **Previous** / **Next** controls that disable at the first and last image, plus a current/total counter.

## Files

- `index.html` — host page with `<app-root>`
- `main.ts` — bootstraps `AppComponent` via `bootstrapApplication`
- `app.component.ts` — standalone `AppComponent`; holds the image list and renders the slider
- `image-slider.component.ts` — standalone `ImageSliderComponent` (`@Input() images`, prev/next + counter)

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL and edit `app.component.ts` to use your own images.
