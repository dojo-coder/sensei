const { run, uses, count, calls, declares } = require('dojo-io');

describe('Count to five', () => {
  it('prints 1 to 5', () => {
    expect(run()).toBe('1\n2\n3\n4\n5');
  });

  it('uses a for loop', () => {
    expect(uses('for')).toBe(true);
  });

  it('does not use while', () => {
    expect(uses('while')).toBe(false);
  });

  it('has one if inside the loop', () => {
    expect(count('if@for')).toBe(1);
  });

  it('calls console.log', () => {
    expect(calls('console.log')).toBe(true);
  });

  it('declares and updates total', () => {
    expect(declares('total')).toBe(true);
    expect(uses('update:total@for')).toBe(true);
    expect(uses('operator:%')).toBe(true);
  });
});
