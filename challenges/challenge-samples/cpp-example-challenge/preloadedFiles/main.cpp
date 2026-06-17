#include <iostream>
#include "app.hpp"

int main() {
    std::string result1 = longestPalindromicSubstring("babad");
    std::cout << "longestPalindromicSubstring(\"babad\"): " << result1 << std::endl;

    std::string result2 = longestPalindromicSubstring("cbbd");
    std::cout << "longestPalindromicSubstring(\"cbbd\"): " << result2 << std::endl;

    std::string result3 = longestPalindromicSubstring("");
    std::cout << "longestPalindromicSubstring(\"\"): " << result3 << std::endl;

    return 0;
}




