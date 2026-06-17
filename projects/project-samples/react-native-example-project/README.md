# React Native Image Slider

A small React Native (JavaScript) sandbox that runs in the browser via
[`react-native-web`](https://necolas.github.io/react-native-web/). It renders a
styled image slider built from RN primitives (`View`, `Text`, `Image`,
`Pressable`, `StyleSheet`) with **Previous** / **Next** controls that gray out
and ignore presses at the first and last image, plus a `current / total`
position counter.

The same source compiles unchanged for iOS/Android via Expo or the RN CLI — only
the Vite-powered browser preview is the differentiator. Source files import from
`'react-native'`; the Vite alias resolves that to `react-native-web` at build time.

## Files

- `index.html` — Vite entry point
- `index.jsx` — registers and runs the app via `AppRegistry`
- `App.jsx` — holds the image list and renders the slider
- `ImageSlider.jsx` — the reusable slider component (takes an `images` prop)
- `vite.config.js` — maps `react-native` → `react-native-web`

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173 and edit `App.jsx` to use your own images.
