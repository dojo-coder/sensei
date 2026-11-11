A palindrome is a string that reads the same from left to right and from right to left, for example `"level"`.

Write the function `longestPalindromicSubstring(s)`, which receives a string `s` and returns the longest substring of `s` that is a palindrome.

### Rules & clarifications

- A substring is a sequence of consecutive characters of `s`.
- If `s` has several palindromic substrings of the maximum length, the function may return any one of them.
- If `s` is the empty string, the function returns `""`.
- Uppercase and lowercase letters are different characters: `"Aa"` is not a palindrome.
- A single character is a palindrome of length 1.

### Examples

- `longestPalindromicSubstring("babad")` returns `"bab"` _(`"aba"` has the same length and is also accepted)_.
- `longestPalindromicSubstring("cbbd")` returns `"bb"`.
- `longestPalindromicSubstring("a")` returns `"a"`.
- `longestPalindromicSubstring("aaaa")` returns `"aaaa"`.
- `longestPalindromicSubstring("")` returns `""`.
