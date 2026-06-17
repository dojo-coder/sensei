Build a React Native Web + TypeScript `App` component that renders a `<Text>` element containing `Hello, World!` inside a centered `<View>`.

The template uses [`react-native-web`](https://necolas.github.io/react-native-web/) with TypeScript types from `@types/react-native`. The Vite alias (`react-native` → `react-native-web`) makes the import path identical to a real iOS/Android Expo project — the same `App.tsx` could ship unchanged to a mobile build.

The seed ships:

- `App.tsx` — the component (this is the file you edit)
- `index.tsx` — `AppRegistry` mount (readonly)

## Expected solution

```tsx
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  text: { fontSize: 24, fontWeight: '600' }
});
```

For typed styles, you can use `ViewStyle`, `TextStyle`, `ImageStyle` from `react-native`. Tests use `@testing-library/react` against jsdom — `Text` renders as a `<div>` so `screen.getByText('Hello, World!')` works normally.
