A palindrome is a string that reads the same from left to right and from right to left, for example `"level"`.

Write the function `longest_palindromic_substring(s)`, which receives a string `s` and returns the longest substring of `s` that is a palindrome.

### Rules & clarifications

- A substring is a sequence of consecutive characters of `s`.
- If `s` has several palindromic substrings of the maximum length, the function may return any one of them.
- If `s` is the empty string, the function returns `""`.
- Uppercase and lowercase letters are different characters: `"Aa"` is not a palindrome.
- A single character is a palindrome of length 1.

### Examples

- `longest_palindromic_substring("babad")` returns `"bab"` _(`"aba"` has the same length and is also accepted)_.
- `longest_palindromic_substring("cbbd")` returns `"bb"`.
- `longest_palindromic_substring("a")` returns `"a"`.
- `longest_palindromic_substring("aaaa")` returns `"aaaa"`.
- `longest_palindromic_substring("")` returns `""`.
