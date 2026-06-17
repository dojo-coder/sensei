import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import ImageSlider from './ImageSlider';

const images: string[] = [
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
    gap: 16
  } as ViewStyle,
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827'
  } as TextStyle
});
