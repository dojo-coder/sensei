import { describe, expect, it } from '@jest/globals';
import { run } from 'dojo-io';

describe('Hello World', () => {
  it('prints Hello World', () => {
    expect(run()).toBe('Hello World');
  });
});
