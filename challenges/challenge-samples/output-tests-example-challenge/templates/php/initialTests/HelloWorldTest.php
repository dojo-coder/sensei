<?php

use PHPUnit\Framework\TestCase;

class HelloWorldTest extends TestCase
{
    public function testPrintsHelloWorld(): void
    {
        $this->assertSame('Hello World', DojoIO::run());
    }
}
