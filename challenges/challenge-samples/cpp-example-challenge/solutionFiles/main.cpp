#include <iostream>
#include "app.hpp"
using namespace std;

int main() {
    string result1 = longestPalindromicSubstring("babad");
    cout << "longestPalindromicSubstring(\"babad\"): " << result1 << endl;

    string result2 = longestPalindromicSubstring("cbbd");
    cout << "longestPalindromicSubstring(\"cbbd\"): " << result2 << endl;

    string result3 = longestPalindromicSubstring("");
    cout << "longestPalindromicSubstring(\"\"): " << result3 << endl;

    return 0;
}




