#include "app.hpp"
#include <string>
#include <algorithm>

static inline int expandAroundCenter(const std::string& s, int l, int r) {
    const int n = static_cast<int>(s.size());
    while (l >= 0 && r < n && s[l] == s[r]) {
        --l; ++r;
    }
    // length of palindrome inside (l, r)
    return r - l - 1;
}

std::string longestPalindromicSubstring(const std::string& s) {
    if (s.empty()) return "";

    int start = 0, end = 0; // inclusive
    const int n = static_cast<int>(s.size());

    for (int i = 0; i < n; ++i) {
        int len1 = expandAroundCenter(s, i, i);     // odd center
        int len2 = expandAroundCenter(s, i, i + 1); // even center
        int maxLen = std::max(len1, len2);

        if (maxLen > (end - start + 1)) {
            start = i - (maxLen - 1) / 2;
            end   = i +  maxLen / 2;
        }
    }

    return s.substr(start, end - start + 1);
}
