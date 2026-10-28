const { run } = require('dojo-io');

describe('Hello World', () => {
  it('prints Hello World', () => {
    expect(run()).toBe('Hello World');
  });
});
