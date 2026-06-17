<?php
use PHPUnit\Framework\TestCase;
require_once __DIR__ . '/App.php';

/**
 * @testdox longestPalindromicSubstring
 */
class LPSAllTest extends TestCase {

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
  public function test_a() {
    $this->assertSame('a', longestPalindromicSubstring('a'));
  }

  /** @testdox Returns 'aa' for s='aa' */
  public function test_aa() {
    $this->assertSame('aa', longestPalindromicSubstring('aa'));
  }

  /** @testdox Returns '' for empty string */
  public function test_empty() {
    $this->assertSame('', longestPalindromicSubstring(''));
  }

  /** @testdox Returns 'anana' for s='banana' */
  public function test_banana() {
    $this->assertSame('anana', longestPalindromicSubstring('banana'));
  }

  /** @testdox Returns 'racecar' for s='racecar' */
  public function test_racecar() {
    $this->assertSame('racecar', longestPalindromicSubstring('racecar'));
  }

  /** @testdox Returns 'madam' for s='madam' */
  public function test_madam() {
    $this->assertSame('madam', longestPalindromicSubstring('madam'));
  }

  /** @testdox Returns 'aaaa' for s='aaaa' */
  public function test_aaaa() {
    $this->assertSame('aaaa', longestPalindromicSubstring('aaaa'));
  }
}
