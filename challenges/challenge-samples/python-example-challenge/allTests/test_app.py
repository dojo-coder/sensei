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

    @m.it("Should return 'anana' for s='banana'")
    def test_case6(self):
        assert longest_palindromic_substring('banana') == 'anana'

    @m.it("Should return 'racecar' for s='racecar'")
    def test_case7(self):
        assert longest_palindromic_substring('racecar') == 'racecar'

    @m.it("Should return 'madam' for s='madam'")
    def test_case8(self):
        assert longest_palindromic_substring('madam') == 'madam'

    @m.it("Should return 'aaaa' for s='aaaa'")
    def test_case9(self):
        assert longest_palindromic_substring('aaaa') == 'aaaa'