<?php

/**
 * Return the FizzBuzz representation of a single number.
 *
 * - Multiples of 3 and 5 -> "FizzBuzz"
 * - Multiples of 3       -> "Fizz"
 * - Multiples of 5       -> "Buzz"
 * - Otherwise            -> the number itself
 */
function fizzbuzz(int $n): string {
    if ($n % 15 === 0) {
        return 'FizzBuzz';
    }
    if ($n % 3 === 0) {
        return 'Fizz';
    }
    if ($n % 5 === 0) {
        return 'Buzz';
    }
    return (string) $n;
}

for ($i = 1; $i <= 15; $i++) {
    echo fizzbuzz($i) . "\n";
}
