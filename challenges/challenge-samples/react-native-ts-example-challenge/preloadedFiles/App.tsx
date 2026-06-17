import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  // TODO: render a <Text> with the message 'Hello, World!' inside the <View>.
  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  text: {
    fontSize: 24,
    fontWeight: '600'
  }
});
