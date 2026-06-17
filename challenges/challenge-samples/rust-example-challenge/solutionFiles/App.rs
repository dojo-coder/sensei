pub fn longest_palindromic_substring(s: &str) -> String {
  let n = s.len();
  if n == 0 { return String::new(); }

  let bytes = s.as_bytes();
  let mut start: i32 = 0;
  let mut end: i32 = 0;

  // expand around center, returning palindrome length
  let mut expand = |mut l: i32, mut r: i32| -> i32 {
      while l >= 0 && (r as usize) < n && bytes[l as usize] == bytes[r as usize] {
          l -= 1;
          r += 1;
      }
      r - l - 1 // length inside (l, r)
  };

  for i in 0..n {
      let i = i as i32;
      let len1 = expand(i, i);       // odd-length center
      let len2 = expand(i, i + 1);   // even-length center
      let max_len = len1.max(len2);

      if max_len > (end - start + 1) {
          start = i - (max_len - 1) / 2;
          end   = i +  max_len / 2;
      }
  }

  s[(start as usize)..=(end as usize)].to_string()
}
