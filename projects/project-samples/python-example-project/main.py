"""FizzBuzz for the numbers 1 through 15.

Rules:
- Print "Fizz" if the number is divisible by 3.
- Print "Buzz" if the number is divisible by 5.
- Print "FizzBuzz" if it is divisible by both 3 and 5.
- Otherwise, print the number itself.
"""


def fizzbuzz(n: int) -> str:
    """Return the FizzBuzz value for a single number."""
    if n % 15 == 0:        # divisible by both 3 and 5
        return "FizzBuzz"
    if n % 3 == 0:         # divisible by 3
        return "Fizz"
    if n % 5 == 0:         # divisible by 5
        return "Buzz"
    return str(n)          # not divisible by 3 or 5


def main() -> None:
    """Print FizzBuzz for the numbers 1 through 15."""
    for n in range(1, 16):
        print(fizzbuzz(n))


if __name__ == "__main__":
    main()
