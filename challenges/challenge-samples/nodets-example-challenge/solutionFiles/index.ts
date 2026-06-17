export function longestPalindromicSubstring(s: string): string {
  if (!s) return "";

  let start: number = 0;
  let end: number = 0;

  const expand = (l: number, r: number): number => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    return r - l - 1;
  };

  for (let i = 0; i < s.length; i++) {
    const len1: number = expand(i, i);
    const len2: number = expand(i, i + 1);
    const maxLen: number = Math.max(len1, len2);

    if (maxLen > end - start + 1) {
      start = i - Math.floor((maxLen - 1) / 2);
      end = i + Math.floor(maxLen / 2);
    }
  }

  return s.slice(start, end + 1);
}
