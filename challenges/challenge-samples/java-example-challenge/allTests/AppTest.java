package challenge;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("longestPalindromicSubstring")
public class AppTest {

    @Test
    @DisplayName("Returns 'bab' or 'aba' for s='babad'")
    void babad() {
        String res = App.longestPalindromicSubstring("babad");
        assertTrue(res.equals("bab") || res.equals("aba"));
    }

    @Test
    @DisplayName("Returns 'bb' for s='cbbd'")
    void cbbd() {
        assertEquals("bb", App.longestPalindromicSubstring("cbbd"));
    }

    @Test
    @DisplayName("Returns 'a' for s='a'")
    void a() {
        assertEquals("a", App.longestPalindromicSubstring("a"));
    }

    @Test
    @DisplayName("Returns 'aa' for s='aa'")
    void aa() {
        assertEquals("aa", App.longestPalindromicSubstring("aa"));
    }

    @Test
    @DisplayName("Returns '' for empty string")
    void empty() {
        assertEquals("", App.longestPalindromicSubstring(""));
    }

    @Test
    @DisplayName("Returns 'anana' for s='banana'")
    void banana() {
        assertEquals("anana", App.longestPalindromicSubstring("banana"));
    }

    @Test
    @DisplayName("Returns 'racecar' for s='racecar'")
    void racecar() {
        assertEquals("racecar", App.longestPalindromicSubstring("racecar"));
    }

    @Test
    @DisplayName("Returns 'madam' for s='madam'")
    void madam() {
        assertEquals("madam", App.longestPalindromicSubstring("madam"));
    }

    @Test
    @DisplayName("Returns 'aaaa' for s='aaaa'")
    void aaaa() {
        assertEquals("aaaa", App.longestPalindromicSubstring("aaaa"));
    }
}
