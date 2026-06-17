import { createSignal } from 'solid-js';
import type { Component, JSX } from 'solid-js';

type ImageSliderProps = {
  images: string[];
};

const styles: Record<string, JSX.CSSProperties> = {
  wrapper: {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    gap: '16px',
  },
  image: {
    width: '400px',
    height: '300px',
    'object-fit': 'cover',
    'border-radius': '12px',
    'box-shadow': '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
  controls: {
    display: 'flex',
    gap: '12px',
    'align-items': 'center',
  },
  button: {
    padding: '8px 18px',
    'font-size': '15px',
    border: 'none',
    'border-radius': '8px',
    background: '#4f46e5',
    color: 'white',
    cursor: 'pointer',
  },
  buttonDisabled: {
    background: '#c7c7d1',
    cursor: 'not-allowed',
  },
  counter: {
    'min-width': '52px',
    'text-align': 'center',
    color: '#444',
    'font-variant-numeric': 'tabular-nums',
  },
};

const ImageSlider: Component<ImageSliderProps> = (props) => {
  const [currentImage, setCurrentImage] = createSignal(0);

  const isPrevDisabled = () => currentImage() === 0;
  const isNextDisabled = () => currentImage() === props.images.length - 1;

  const nextImage = () => {
    if (!isNextDisabled()) setCurrentImage(currentImage() + 1);
  };

  const previousImage = () => {
    if (!isPrevDisabled()) setCurrentImage(currentImage() - 1);
  };

  if (props.images.length === 0) {
    return <p>No images to display.</p>;
  }

  return (
    <div style={styles.wrapper}>
      <img
        style={styles.image}
        src={props.images[currentImage()]}
        alt={`Slide ${currentImage() + 1}`}
      />
      <div style={styles.controls}>
        <button
          style={{
            ...styles.button,
            ...(isPrevDisabled() ? styles.buttonDisabled : {}),
          }}
          disabled={isPrevDisabled()}
          onClick={previousImage}
        >
          Previous
        </button>
        <span style={styles.counter}>
          {currentImage() + 1} / {props.images.length}
        </span>
        <button
          style={{
            ...styles.button,
            ...(isNextDisabled() ? styles.buttonDisabled : {}),
          }}
          disabled={isNextDisabled()}
          onClick={nextImage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
