#[cfg(test)]
mod tests_initial {
    use crate::app::longest_palindromic_substring as lps;

    #[test]
    /// Should find a longest palindrome in a string with multiple valid answers
    fn babad_returns_valid_palindrome() {
        let res = lps("babad");
        assert!(res == "bab" || res == "aba");
    }

    #[test]
    /// Should detect even-length palindromes correctly
    fn cbbd_handles_even_length() {
        assert_eq!(lps("cbbd"), "bb");
    }

    #[test]
    /// Should handle single-character input
    fn single_char_returns_itself() {
        assert_eq!(lps("a"), "a");
    }

    #[test]
    /// Should handle two identical characters
    fn double_char_returns_itself() {
        assert_eq!(lps("aa"), "aa");
    }

    #[test]
    /// Should return empty string for empty input
    fn empty_input_returns_empty() {
        assert_eq!(lps(""), "");
    }
}