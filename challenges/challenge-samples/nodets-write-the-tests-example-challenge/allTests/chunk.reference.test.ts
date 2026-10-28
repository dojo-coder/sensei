import { chunk } from './chunk';

describe('chunk (reference suite)', () => {
  it('keeps a shorter trailing chunk', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('throws a RangeError for non-positive sizes', () => {
    expect(() => chunk([1], 0)).toThrow(RangeError);
    expect(() => chunk([1], -2)).toThrow(RangeError);
  });

  it('returns an empty list for empty input', () => {
    expect(chunk([], 3)).toEqual([]);
  });
});
