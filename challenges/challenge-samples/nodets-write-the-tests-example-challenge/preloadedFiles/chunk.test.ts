import { chunk } from './chunk';

describe('chunk', () => {
  it('splits a list into evenly sized chunks', () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4]
    ]);
  });

  // Add tests until every hidden bug is caught.
});
