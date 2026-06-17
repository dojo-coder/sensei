#include <catch2/catch_test_macros.hpp>
#include "app.hpp"
#include <string>

TEST_CASE("babad -> 'bab' or 'aba'") {
    auto res = longestPalindromicSubstring("babad");
    REQUIRE((res == "bab" || res == "aba"));
}

TEST_CASE("cbbd -> 'bb'") {
    REQUIRE(longestPalindromicSubstring("cbbd") == "bb");
}

TEST_CASE("a -> 'a'") {
    REQUIRE(longestPalindromicSubstring("a") == "a");
}

TEST_CASE("aa -> 'aa'") {
    REQUIRE(longestPalindromicSubstring("aa") == "aa");
}

TEST_CASE("empty -> ''") {
    REQUIRE(longestPalindromicSubstring("") == "");
}

TEST_CASE("banana -> 'anana'") {
    REQUIRE(longestPalindromicSubstring("banana") == "anana");
}

TEST_CASE("racecar -> 'racecar'") {
    REQUIRE(longestPalindromicSubstring("racecar") == "racecar");
}

TEST_CASE("madam -> 'madam'") {
    REQUIRE(longestPalindromicSubstring("madam") == "madam");
}

TEST_CASE("aaaa -> 'aaaa'") {
    REQUIRE(longestPalindromicSubstring("aaaa") == "aaaa");
}
