#include <criterion/criterion.h>
#include <string.h>
#include <stdlib.h>
#include "main.h"

Test(longestPalindromicSubstring, returns_bab_or_aba_for_babad,
     .description = "Should find a longest palindrome in a string with multiple valid answers") {
    char *res = longestPalindromicSubstring("babad");
    cr_assert(res != NULL);
    cr_assert((strcmp(res, "bab") == 0) || (strcmp(res, "aba") == 0));
    free(res);
}

Test(longestPalindromicSubstring, returns_bb_for_cbbd,
     .description = "Should correctly detect even-length palindromes inside a string") {
    char *res = longestPalindromicSubstring("cbbd");
    cr_assert_str_eq(res, "bb");
    free(res);
}

Test(longestPalindromicSubstring, returns_a_for_a,
     .description = "Should handle single-character input") {
    char *res = longestPalindromicSubstring("a");
    cr_assert_str_eq(res, "a");
    free(res);
}

Test(longestPalindromicSubstring, returns_aa_for_aa,
     .description = "Should handle two identical characters") {
    char *res = longestPalindromicSubstring("aa");
    cr_assert_str_eq(res, "aa");
    free(res);
}

Test(longestPalindromicSubstring, returns_empty_for_empty_input,
     .description = "Should return empty result for empty input") {
    char *res = longestPalindromicSubstring("");
    cr_assert_str_eq(res, "");
    free(res);
}

Test(longestPalindromicSubstring, returns_anana_for_banana,
     .description = "Should detect long odd-length palindromes within a larger string") {
    char *res = longestPalindromicSubstring("banana");
    cr_assert_str_eq(res, "anana");
    free(res);
}

Test(longestPalindromicSubstring, returns_racecar_for_racecar,
     .description = "Should return the full string when the entire input is a palindrome") {
    char *res = longestPalindromicSubstring("racecar");
    cr_assert_str_eq(res, "racecar");
    free(res);
}

Test(longestPalindromicSubstring, returns_madam_for_madam,
     .description = "Should correctly identify complete palindromic words") {
    char *res = longestPalindromicSubstring("madam");
    cr_assert_str_eq(res, "madam");
    free(res);
}

Test(longestPalindromicSubstring, returns_aaaa_for_aaaa,
     .description = "Should handle repeated identical characters correctly") {
    char *res = longestPalindromicSubstring("aaaa");
    cr_assert_str_eq(res, "aaaa");
    free(res);
}