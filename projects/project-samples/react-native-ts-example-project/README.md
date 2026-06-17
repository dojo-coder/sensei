# React Native TypeScript Image Slider

A runnable React Native + TypeScript sandbox built with [`react-native-web`](https://necolas.github.io/react-native-web/) and Vite. It renders an image slider using only React Native primitives (`View`, `Text`, `Image`, `Pressable`, `StyleSheet`), with **Previous** / **Next** controls that visually disable at the first and last image, plus a `current / total` counter.

The Vite alias (`react-native` → `react-native-web`) makes the import path identical to a real iOS/Android Expo project — the same `App.tsx` / `ImageSlider.tsx` could ship unchanged to a mobile build.

## Files

- `index.html` — Vite entry point
- `index.tsx` — `AppRegistry` mount (react-native-web)
- `App.tsx` — holds the image list and renders the slider
- `ImageSlider.tsx` — the reusable slider component, typed `images: string[]` prop (state + props)
- `vite.config.ts` — Vite config with the `react-native` → `react-native-web` alias
- `tsconfig.json` — TypeScript config

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (http://localhost:5173) and edit `App.tsx` to use your own images.
