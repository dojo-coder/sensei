const { sum } = require('./sum');

describe('sum (reference suite)', () => {
  it('adds two positive numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('adds negative numbers correctly', () => {
    expect(sum(-2, -3)).toBe(-5);
    expect(sum(-2, 5)).toBe(3);
  });

  it('throws a TypeError for non-number input', () => {
    expect(() => sum('1', 2)).toThrow(TypeError);
    expect(() => sum(1, undefined)).toThrow(TypeError);
  });
});
