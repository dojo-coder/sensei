<?php
function longestPalindromicSubstring(string $s): string {
    $n = strlen($s);
    if ($n === 0) return "";

    $start = 0;
    $end = 0;

    // Expand around center and return palindrome length
    $expand = function(int $l, int $r) use ($s, $n): int {
        while ($l >= 0 && $r < $n && $s[$l] === $s[$r]) {
            $l--; $r++;
        }
        // when loop stops, l/r are one step beyond the palindrome bounds
        return $r - $l - 1;
    };

    for ($i = 0; $i < $n; $i++) {
        $len1 = $expand($i, $i);       // odd length
        $len2 = $expand($i, $i + 1);   // even length
        $maxLen = max($len1, $len2);

        if ($maxLen > ($end - $start + 1)) {
            $start = $i - intdiv($maxLen - 1, 2);
            $end   = $i + intdiv($maxLen, 2);
        }
    }

    return substr($s, $start, $end - $start + 1);
}
