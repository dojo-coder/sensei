function longestPalindromicSubstring(s) {
  if (!s) return "";

  let start = 0;
  let end = 0;

  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    // length of palindrome between (l+1, r-1)
    return r - l - 1;
  };

  for (let i = 0; i < s.length; i++) {
    const len1 = expand(i, i); // odd length
    const len2 = expand(i, i + 1); // even length
    const maxLen = Math.max(len1, len2);

    if (maxLen > end - start + 1) {
      start = i - Math.floor((maxLen - 1) / 2);
      end = i + Math.floor(maxLen / 2);
    }
  }

  return s.slice(start, end + 1);
}

module.exports = {
  longestPalindromicSubstring,
};
