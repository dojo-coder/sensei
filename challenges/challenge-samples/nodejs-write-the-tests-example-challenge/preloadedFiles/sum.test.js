const { sum } = require('./sum');

describe('sum', () => {
  it('adds two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });

  // Add tests until every hidden bug is caught.
});
