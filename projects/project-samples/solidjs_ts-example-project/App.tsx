import type { Component } from 'solid-js';
import ImageSlider from './ImageSlider';

const images: string[] = [
  'https://i.imgur.com/rmydi2w.jpg',
  'https://i.imgur.com/rAFqZiM.jpg',
  'https://i.imgur.com/Fpw5KKY.jpg',
  'https://i.imgur.com/IbYRmoW.jpg',
  'https://i.imgur.com/9poVrgA.jpg',
];

const App: Component = () => {
  return (
    <div
      style={{
        'font-family': 'system-ui, sans-serif',
        'max-width': '640px',
        margin: '40px auto',
        'text-align': 'center',
      }}
    >
      <h1>Image Slider</h1>
      <p style={{ color: '#666' }}>
        Use Previous / Next to browse. The buttons disable at the first and last
        image. Edit <code>App.tsx</code> to swap in your own images.
      </p>
      <ImageSlider images={images} />
    </div>
  );
};

export default App;
