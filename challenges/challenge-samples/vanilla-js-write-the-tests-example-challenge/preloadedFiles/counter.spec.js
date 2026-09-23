import { createCounter } from './counter';

describe('counter.js', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = globalThis.htmlContent;
    createCounter(document.getElementById('app'));
  });

  test('starts at zero', () => {
    expect(document.querySelector('p').textContent).toEqual('Count: 0');
  });

  // Add tests until every hidden bug is caught.
});
