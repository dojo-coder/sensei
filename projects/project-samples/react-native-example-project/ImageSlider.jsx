import { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export default function ImageSlider({ images = [] }) {
  const [index, setIndex] = useState(0);

  const total = images.length;
  const isFirst = index === 0;
  const isLast = index === total - 1 || total === 0;

  const goPrevious = () => {
    if (isFirst) return;
    setIndex((i) => i - 1);
  };

  const goNext = () => {
    if (isLast) return;
    setIndex((i) => i + 1);
  };

  if (total === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.counter}>No images to display</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: images[index] }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.counter}>
        {index + 1} / {total}
      </Text>

      <View style={styles.controls}>
        <Pressable
          onPress={goPrevious}
          disabled={isFirst}
          style={[styles.button, isFirst && styles.buttonDisabled]}
        >
          <Text style={[styles.buttonText, isFirst && styles.buttonTextDisabled]}>
            Previous
          </Text>
        </Pressable>

        <Pressable
          onPress={goNext}
          disabled={isLast}
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
    width: 320
  },
  image: {
    width: 320,
    height: 240,
    borderRadius: 12,
    backgroundColor: '#e0e0e0'
  },
  counter: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 12,
    color: '#333'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#2563eb'
  },
  buttonDisabled: {
    backgroundColor: '#cbd5e1'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600'
  },
  buttonTextDisabled: {
    color: '#94a3b8'
  }
});
