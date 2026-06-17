import { describe, expect, it } from '@jest/globals';
import { longestPalindromicSubstring } from './index';

describe('longestPalindromicSubstring (initial)', () => {
  it("returns 'bab' or 'aba' for s='babad'", () => {
    const res = longestPalindromicSubstring('babad');
    expect(['bab', 'aba']).toContain(res);
  });

  it("returns 'bb' for s='cbbd'", () => {
    expect(longestPalindromicSubstring('cbbd')).toBe('bb');
  });

  it("returns 'a' for s='a'", () => {
    expect(longestPalindromicSubstring('a')).toBe('a');
  });

  it("returns 'aa' for s='aa'", () => {
    expect(longestPalindromicSubstring('aa')).toBe('aa');
  });

  it("returns '' for empty string", () => {
    expect(longestPalindromicSubstring('')).toBe('');
  });
});
