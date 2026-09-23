import { render, screen, fireEvent } from '@testing-library/angular';
import { AppComponent } from './app.component';

const button = (name: string): HTMLButtonElement => screen.getByRole('button', { name }) as HTMLButtonElement;

describe('Counter (reference suite)', () => {
  it('starts at zero', async () => {
    await render(AppComponent);
    expect(screen.getByText('Count: 0')).toBeTruthy();
  });

  it('increments by one', async () => {
    await render(AppComponent);
    fireEvent.click(button('Increment'));
    expect(screen.getByText('Count: 1')).toBeTruthy();
  });

  it('decrements by one', async () => {
    await render(AppComponent);
    fireEvent.click(button('Increment'));
    fireEvent.click(button('Increment'));
    fireEvent.click(button('Decrement'));
    expect(screen.getByText('Count: 1')).toBeTruthy();
  });

  it('never goes below zero', async () => {
    await render(AppComponent);
    expect(button('Decrement').disabled).toBe(true);
    fireEvent.click(button('Decrement'));
    expect(screen.getByText('Count: 0')).toBeTruthy();
    fireEvent.click(button('Increment'));
    expect(button('Decrement').disabled).toBe(false);
  });

  it('resets to zero after a single increment', async () => {
    await render(AppComponent);
    fireEvent.click(button('Increment'));
    fireEvent.click(button('Reset'));
    expect(screen.getByText('Count: 0')).toBeTruthy();
  });
});
