#include <criterion/criterion.h>
#include <string.h>
#include <stdlib.h>
#include "main.h"

Test(longestPalindromicSubstring, returns_valid_palindrome_for_babad,
     .description = "Should correctly identify a longest palindromic substring in a mixed string") {
    char *res = longestPalindromicSubstring("babad");
    cr_assert(res != NULL);
    cr_assert((strcmp(res, "bab") == 0) || (strcmp(res, "aba") == 0));
    free(res);
}

Test(longestPalindromicSubstring, handles_even_length_palindrome,
     .description = "Should correctly handle even-length palindromes") {
    char *res = longestPalindromicSubstring("cbbd");
    cr_assert_str_eq(res, "bb");
    free(res);
}

Test(longestPalindromicSubstring, handles_single_character,
     .description = "Should handle single-character input") {
    char *res = longestPalindromicSubstring("a");
    cr_assert_str_eq(res, "a");
    free(res);
}

Test(longestPalindromicSubstring, handles_two_identical_characters,
     .description = "Should handle two identical characters") {
    char *res = longestPalindromicSubstring("aa");
    cr_assert_str_eq(res, "aa");
    free(res);
}

Test(longestPalindromicSubstring, handles_empty_string,
     .description = "Should handle empty input string") {
    char *res = longestPalindromicSubstring("");
    cr_assert_str_eq(res, "");
    free(res);
}
