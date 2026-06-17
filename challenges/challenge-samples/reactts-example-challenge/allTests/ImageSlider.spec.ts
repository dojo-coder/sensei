import '@testing-library/jest-dom/jest-globals';
import * as React from 'react';

import { describe, expect, it, beforeEach } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageSlider from './ImageSlider';

describe('ImageSlider', () => {
  let prevBtn: HTMLButtonElement;
  let nextBtn: HTMLButtonElement;
  let img: HTMLImageElement;

  const images: string[] = [
    'https://i.imgur.com/rmydi2w.jpg',
    'https://i.imgur.com/rAFqZiM.jpg',
    'https://i.imgur.com/Fpw5KKY.jpg',
    'https://i.imgur.com/IbYRmoW.jpg',
    'https://i.imgur.com/9poVrgA.jpg',
  ];

  beforeEach(() => {
    render(React.createElement(ImageSlider, { images }));
    prevBtn = screen.getByText('Previous') as HTMLButtonElement;
    nextBtn = screen.getByText('Next') as HTMLButtonElement;
    img = screen.getByRole('img') as HTMLImageElement;
  });

  it('displays the first image', () => {
    expect(img).toHaveAttribute('src', images[0]);
  });

  it('has the previous button initially disabled', () => {
    expect(prevBtn).toBeDisabled();
  });

  it('shows the next image when clicking on the next button', () => {
    fireEvent.click(nextBtn);
    expect(img).toHaveAttribute('src', images[1]);
  });

  it('shows the previous image when clicking on the previous button', () => {
    fireEvent.click(nextBtn); // go to second image
    fireEvent.click(prevBtn); // back to first image
    expect(img).toHaveAttribute('src', images[0]);
  });

  it('enables the previous button if current image is not the first', () => {
    fireEvent.click(nextBtn);
    expect(prevBtn).not.toBeDisabled();
  });

  it('disables previous button when clicking previous button and the first image is displayed', () => {
    fireEvent.click(nextBtn); // go to second image
    expect(img).toHaveAttribute('src', images[1]);
    expect(prevBtn).not.toBeDisabled();

    fireEvent.click(prevBtn); // back to first
    expect(img).toHaveAttribute('src', images[0]);
    expect(prevBtn).toBeDisabled();
  });

  it('disables the next button when reaching the last image in images list', () => {
    for (let i = 0; i < images.length - 1; i++) {
      fireEvent.click(nextBtn);
    }
    expect(img).toHaveAttribute('src', images[images.length - 1]);
    expect(nextBtn).toBeDisabled();
  });
});
