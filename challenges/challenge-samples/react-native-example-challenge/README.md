Build a React Native Web `App` component that renders a `<Text>` element containing `Hello, World!` inside a centered `<View>`.

The template uses [`react-native-web`](https://necolas.github.io/react-native-web/) — the same RN primitives (`View`, `Text`, `StyleSheet`, `Pressable`, ...) that ship to iOS/Android, but rendered to web DOM. The Vite alias (`react-native` → `react-native-web`) makes the import path identical to a real mobile project.

The seed ships:

- `App.jsx` — the component (this is the file you edit)
- `index.jsx` — `AppRegistry` mount (readonly)

## Expected solution

```jsx
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

Tests use `@testing-library/react` against jsdom — `Text` renders as a `<div>` so `screen.getByText('Hello, World!')` works normally. Use `fireEvent.click(...)` for press interactions (RN web maps press → click).
