def longest_palindromic_substring(s)
    return "" if s.nil? || s.empty?
  
    start = 0
    finish = 0
  
    expand = lambda do |l, r|
      while l >= 0 && r < s.length && s[l] == s[r]
        l -= 1
        r += 1
      end
      r - l - 1  # palindrome length inside (l, r)
    end
  
    (0...s.length).each do |i|
      len1 = expand.call(i, i)       # odd-length center
      len2 = expand.call(i, i + 1)   # even-length center
      max_len = [len1, len2].max
  
      if max_len > (finish - start + 1)
        start  = i - ((max_len - 1) / 2)
        finish = i + (max_len / 2)
      end
    end
  
    s[start..finish]
  end
  