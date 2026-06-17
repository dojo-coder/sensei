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
    // First go to second image
    fireEvent.click(nextBtn);
    // Then go back to first image
    fireEvent.click(prevBtn);
    expect(img).toHaveAttribute('src', images[0]);
  });
});
