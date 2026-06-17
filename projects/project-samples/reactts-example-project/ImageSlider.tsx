import React, { useState } from "react";

interface ImageSliderProps {
  images: string[];
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  image: {
    width: "400px",
    height: "300px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  },
  controls: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  button: {
    padding: "8px 18px",
    fontSize: "15px",
    border: "none",
    borderRadius: "8px",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer",
  },
  buttonDisabled: {
    background: "#c7c7d1",
    cursor: "not-allowed",
  },
  counter: {
    minWidth: "52px",
    textAlign: "center",
    color: "#444",
    fontVariantNumeric: "tabular-nums",
  },
};

function ImageSlider({ images = [] }: ImageSliderProps) {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const isPrevDisabled = currentImage === 0;
  const isNextDisabled = currentImage === images.length - 1;

  const nextImage = () => {
    if (!isNextDisabled) setCurrentImage(currentImage + 1);
  };

  const previousImage = () => {
    if (!isPrevDisabled) setCurrentImage(currentImage - 1);
  };

  if (images.length === 0) {
    return <p>No images to display.</p>;
  }

  return (
    <div style={styles.wrapper}>
      <img
        style={styles.image}
        src={images[currentImage]}
        alt={`Slide ${currentImage + 1}`}
      />
      <div style={styles.controls}>
        <button
          style={{
            ...styles.button,
            ...(isPrevDisabled ? styles.buttonDisabled : {}),
          }}
          disabled={isPrevDisabled}
          onClick={previousImage}
        >
          Previous
        </button>
        <span style={styles.counter}>
          {currentImage + 1} / {images.length}
        </span>
        <button
          style={{
            ...styles.button,
            ...(isNextDisabled ? styles.buttonDisabled : {}),
          }}
          disabled={isNextDisabled}
          onClick={nextImage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ImageSlider;
