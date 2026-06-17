#include <stdio.h>
#include <stdlib.h>
#include "main.h"

int main() {
    char* result1 = longestPalindromicSubstring("babad");
    printf("longestPalindromicSubstring(\"babad\"): %s\n", result1);
    free(result1);

    char* result2 = longestPalindromicSubstring("cbbd");
    printf("longestPalindromicSubstring(\"cbbd\"): %s\n", result2);
    free(result2);

    char* result3 = longestPalindromicSubstring("");
    printf("longestPalindromicSubstring(\"\"): %s\n", result3);
    free(result3);

    return 0;
}




