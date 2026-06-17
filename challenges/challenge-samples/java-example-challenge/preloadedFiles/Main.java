package challenge;

public class Main {
    public static void main(String[] args) {
        String result1 = App.longestPalindromicSubstring("babad");
        System.out.println("longestPalindromicSubstring(\"babad\"): " + result1);

        String result2 = App.longestPalindromicSubstring("cbbd");
        System.out.println("longestPalindromicSubstring(\"cbbd\"): " + result2);

        String result3 = App.longestPalindromicSubstring("");
        System.out.println("longestPalindromicSubstring(\"\"): " + result3);
    }
}




