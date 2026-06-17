package challenge;

public class App {
    public static String longestPalindromicSubstring(String s) {
        if (s == null || s.length() == 0) return "";

        int start = 0, end = 0;

        for (int i = 0; i < s.length(); i++) {
            int len1 = expand(s, i, i);       // odd-length center
            int len2 = expand(s, i, i + 1);   // even-length center
            int maxLen = Math.max(len1, len2);

            if (maxLen > (end - start + 1)) {
                start = i - (maxLen - 1) / 2;
                end   = i +  maxLen / 2;
            }
        }
        return s.substring(start, end + 1);
    }

    // Returns length of palindrome expanded around [l, r]
    private static int expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            l--; r++;
        }
        return r - l - 1; // length of palindrome within (l, r)
    }
}
