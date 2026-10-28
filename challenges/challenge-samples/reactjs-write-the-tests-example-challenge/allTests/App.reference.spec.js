import { cleanup, render, screen, fireEvent } from '@testing-library/react';

import App from './App.jsx';

afterEach(cleanup);

const button = (name) => screen.getByRole('button', { name });

describe('Counter (reference suite)', () => {
  test('starts at zero', () => {
    render(<App />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  test('increments by one', () => {
    render(<App />);
    fireEvent.click(button('Increment'));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  test('decrements by one', () => {
    render(<App />);
    fireEvent.click(button('Increment'));
    fireEvent.click(button('Increment'));
    fireEvent.click(button('Decrement'));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  test('never goes below zero', () => {
    render(<App />);
    expect(button('Decrement')).toBeDisabled();
    fireEvent.click(button('Decrement'));
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
    fireEvent.click(button('Increment'));
    expect(button('Decrement')).not.toBeDisabled();
  });

  test('resets to zero after a single increment', () => {
    render(<App />);
    fireEvent.click(button('Increment'));
    fireEvent.click(button('Reset'));
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
});
