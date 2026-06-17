import React from 'react';

interface ImageSliderProps {
  images?: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images = [] }) => {
  return (
    <div>
      <h1>Image Slider using React</h1>
    </div>
  );
};

export default ImageSlider;