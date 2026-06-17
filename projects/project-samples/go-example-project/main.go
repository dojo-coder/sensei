package main

import (
	"fmt"
	"strconv"
)

// fizzbuzz returns the FizzBuzz representation of n:
// "Fizz" for multiples of 3, "Buzz" for multiples of 5,
// "FizzBuzz" for multiples of both, and the number otherwise.
func fizzbuzz(n int) string {
	switch {
	case n%15 == 0:
		return "FizzBuzz"
	case n%3 == 0:
		return "Fizz"
	case n%5 == 0:
		return "Buzz"
	default:
		return strconv.Itoa(n)
	}
}

func main() {
	for n := 1; n <= 15; n++ {
		fmt.Println(fizzbuzz(n))
	}
}
