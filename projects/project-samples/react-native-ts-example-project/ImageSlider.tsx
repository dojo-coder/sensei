import { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle
} from 'react-native';

type ImageSliderProps = {
  images: string[];
};

export default function ImageSlider({ images }: ImageSliderProps) {
  const [index, setIndex] = useState<number>(0);

  if (images.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.counter}>No images to display</Text>
      </View>
    );
  }

  const isFirst = index === 0;
  const isLast = index === images.length - 1;

  const goPrevious = () => {
    if (!isFirst) {
      setIndex((current) => current - 1);
    }
  };

  const goNext = () => {
    if (!isLast) {
      setIndex((current) => current + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: images[index] }}
        resizeMode="cover"
      />

      <Text style={styles.counter}>
        {index + 1} / {images.length}
      </Text>

      <View style={styles.controls}>
        <Pressable
          accessibilityRole="button"
          disabled={isFirst}
          onPress={goPrevious}
          style={[styles.button, isFirst && styles.buttonDisabled]}
        >
          <Text style={[styles.buttonText, isFirst && styles.buttonTextDisabled]}>
            Previous
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          disabled={isLast}
          onPress={goNext}
          style={[styles.button, isLast && styles.buttonDisabled]}
        >
          <Text style={[styles.buttonText, isLast && styles.buttonTextDisabled]}>
            Next
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 16
  } as ViewStyle,
  image: {
    width: 320,
    height: 240,
    borderRadius: 12,
    backgroundColor: '#e5e7eb'
  } as ImageStyle,
  counter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151'
  } as TextStyle,
  controls: {
    flexDirection: 'row',
    gap: 12
  } as ViewStyle,
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#2563eb'
  } as ViewStyle,
  buttonDisabled: {
    backgroundColor: '#cbd5e1',
    opacity: 0.6
  } as ViewStyle,
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600'
  } as TextStyle,
  buttonTextDisabled: {
    color: '#64748b'
  } as TextStyle
});
