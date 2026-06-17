Given a string `s`, return the **longest contiguous substring** of `s` that is a **palindrome**.

### Rules & clarifications

- If multiple longest palindromes exist, **return any one** of them.
- If `s` is empty, return an empty string `""`.
- Palindromes are **case-sensitive** (e.g., `"Aa"` is not a palindrome).
- Substring means **contiguous** characters (not a subsequence).

### Examples

- Input: `"babad"` → Output: `"bab"` _(or `"aba"`; both are valid)_
- Input: `"cbbd"` → Output: `"bb"`
- Input: `""` → Output: `""`
- Input: `"a"` → Output: `"a"`
- Input: `"aaaa"` → Output: `"aaaa"`
