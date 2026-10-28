<?php

use PHPUnit\Framework\TestCase;

class CountTest extends TestCase
{
    public function testPrintsOneToFive(): void
    {
        $this->assertSame("1\n2\n3\n4\n5", DojoIO::run());
    }

    public function testUsesAForLoop(): void
    {
        $this->assertTrue(DojoIO::uses('for'));
    }

    public function testDoesNotUseWhile(): void
    {
        $this->assertFalse(DojoIO::uses('while'));
    }

    public function testHasOneIfInsideTheLoop(): void
    {
        $this->assertSame(1, DojoIO::count('if@for'));
    }

    public function testCallsEcho(): void
    {
        $this->assertTrue(DojoIO::calls('echo'));
    }

    public function testDeclaresAndUpdatesTotal(): void
    {
        $this->assertTrue(DojoIO::declares('$total'));
        $this->assertTrue(DojoIO::uses('update:$total@for'));
    }
}
