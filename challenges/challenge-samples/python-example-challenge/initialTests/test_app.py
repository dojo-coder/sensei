from pytest import mark as m
from challenge.app import longest_palindromic_substring

@m.describe("Longest Palindromic Substring")
class TestLongestPalindromicSubstring:
    @m.it("Should return 'bab' for s='babad'")
    def test_case1(self):
        assert longest_palindromic_substring('babad') in ['bab', 'aba']

    @m.it("Should return 'bb' for s='cbbd'")
    def test_case2(self):
        assert longest_palindromic_substring('cbbd') == 'bb'

    @m.it("Should return 'a' for s='a'")
    def test_case3(self):
        assert longest_palindromic_substring('a') == 'a'

    @m.it("Should return 'aa' for s='aa'")
    def test_case4(self):
        assert longest_palindromic_substring('aa') == 'aa'

    @m.it("Should return '' for an empty string")
    def test_case5(self):
        assert longest_palindromic_substring('') == ''
