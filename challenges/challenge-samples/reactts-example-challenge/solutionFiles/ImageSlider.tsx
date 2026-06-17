import React, { useState } from "react";

interface ImageSliderProps {
  images?: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images = [] }) => {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const isPrevDisabled = currentImage === 0;
  const isNextDisabled = currentImage === images.length - 1;

  const nextImage = () => {
    if (!isNextDisabled) setCurrentImage(currentImage + 1);
  };

  const previousImage = () => {
    if (!isPrevDisabled) setCurrentImage(currentImage - 1);
  };

  return (
    <div className="text-center">
      {images.length > 0 && (
        <img
          src={images[currentImage]}
          alt={`Slide ${currentImage + 1}`}
          width={400}
          height={500}
        />
      )}

      <div className="mt-2">
        <button onClick={previousImage} disabled={isPrevDisabled}>
          Previous
        </button>
        <button onClick={nextImage} disabled={isNextDisabled}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;