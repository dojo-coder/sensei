<?php
use PHPUnit\Framework\TestCase;
require_once __DIR__ . '/App.php';

/**
 * @testdox longestPalindromicSubstring
 */
class LPSInitialTest extends TestCase {

  /** @testdox Returns 'bab' or 'aba' for s='babad' */
  public function test_babad() {
    $res = longestPalindromicSubstring('babad');
    $this->assertContains($res, ['bab', 'aba']);
  }

  /** @testdox Returns 'bb' for s='cbbd' */
  public function test_cbbd() {
    $this->assertSame('bb', longestPalindromicSubstring('cbbd'));
  }

  /** @testdox Returns 'a' for s='a' */
  public function test_single_char_a() {
    $this->assertSame('a', longestPalindromicSubstring('a'));
  }

  /** @testdox Returns 'aa' for s='aa' */
  public function test_double_a() {
    $this->assertSame('aa', longestPalindromicSubstring('aa'));
  }

  /** @testdox Returns '' for empty string */
  public function test_empty() {
    $this->assertSame('', longestPalindromicSubstring(''));
  }
}
