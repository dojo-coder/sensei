import { View, Text, StyleSheet } from 'react-native';
import ImageSlider from './ImageSlider';

const images = [
  'https://i.imgur.com/rmydi2w.jpg',
  'https://i.imgur.com/rAFqZiM.jpg',
  'https://i.imgur.com/Fpw5KKY.jpg',
  'https://i.imgur.com/IbYRmoW.jpg',
  'https://i.imgur.com/9poVrgA.jpg'
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Slider</Text>
      <ImageSlider images={images} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16
  }
});
