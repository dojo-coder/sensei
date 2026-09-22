import { createCounter } from './counter';

const button = (label) => [...document.querySelectorAll('button')].find((node) => node.textContent === label);
const count = () => document.querySelector('p').textContent;

describe('counter.js (reference suite)', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = globalThis.htmlContent;
    createCounter(document.getElementById('app'));
  });

  test('starts at zero', () => {
    expect(count()).toEqual('Count: 0');
  });

  test('increments by one', () => {
    button('Increment').click();
    expect(count()).toEqual('Count: 1');
  });

  test('decrements by one', () => {
    button('Increment').click();
    button('Increment').click();
    button('Decrement').click();
    expect(count()).toEqual('Count: 1');
  });

  test('never goes below zero', () => {
    expect(button('Decrement').disabled).toBe(true);
    button('Decrement').click();
    expect(count()).toEqual('Count: 0');
    button('Increment').click();
    expect(button('Decrement').disabled).toBe(false);
  });

  test('resets to zero after a single increment', () => {
    button('Increment').click();
    button('Reset').click();
    expect(count()).toEqual('Count: 0');
  });
});
