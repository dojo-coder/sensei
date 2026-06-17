import React, { useState } from "react";

function ImageSlider({ images = [] }) {
  const [currentImage, setCurrentImage] = useState(0);

  const isPrevDisabled = currentImage === 0;
  const isNextDisabled = currentImage === images.length - 1;

  const nextImage = () => {
    if (currentImage !== images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage !== 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  return (
    <div>
      <img
        src={images[currentImage]}
        width="200"
        height="250"
        alt={`Image ${currentImage + 1}`}
      />
      <button disabled={isPrevDisabled} onClick={previousImage}>
        Previous
      </button>
      <button disabled={isNextDisabled} onClick={nextImage}>
        Next
      </button>
    </div>
  );
}

export default ImageSlider;
