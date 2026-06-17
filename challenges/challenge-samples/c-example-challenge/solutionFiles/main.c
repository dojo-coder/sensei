#include "main.h"
#include <stdlib.h>
#include <string.h>

/* Expand around center [left, right], return palindrome length. */
static size_t expand_around_center(const char *s, size_t n, long left, long right) {
  while (left >= 0 && (size_t)right < n && s[left] == s[right]) {
    left--;
    right++;
  }
  /* After the loop, (left, right) are just outside the palindrome bounds. */
  return (size_t)(right - left - 1);
}

char *longestPalindromicSubstring(const char *s) {
  if (!s || s[0] == '\0') {
    char *empty = (char *)malloc(1);
    if (empty) empty[0] = '\0';
    return empty;
  }

  size_t n = strlen(s);
  long best_start = 0;
  long best_end   = 0; /* inclusive */

  for (size_t i = 0; i < n; ++i) {
    size_t len1 = expand_around_center(s, n, (long)i, (long)i);       /* odd */
    size_t len2 = expand_around_center(s, n, (long)i, (long)i + 1);   /* even */
    size_t max_len = (len1 > len2) ? len1 : len2;

    if (max_len > (size_t)(best_end - best_start + 1)) {
      best_start = (long)i - (long)((max_len - 1) / 2);
      best_end   = (long)i + (long)(max_len / 2);
    }
  }

  size_t out_len = (size_t)(best_end - best_start + 1);
  char *out = (char *)malloc(out_len + 1);
  if (!out) return NULL;

  memcpy(out, s + best_start, out_len);
  out[out_len] = '\0';
  return out;
}
