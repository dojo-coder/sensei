# C FizzBuzz

A tiny C terminal sandbox that prints **FizzBuzz** for the numbers 1 through 15:
multiples of 3 print `Fizz`, multiples of 5 print `Buzz`, multiples of both print
`FizzBuzz`, and any other number prints itself.

## Files

- `main.c` — the `fizzbuzz` helper plus an `int main(void)` loop over 1..15

## Run locally

```bash
gcc main.c -o fizzbuzz
./fizzbuzz
```

Or in one line:

```bash
cc main.c -o fizzbuzz && ./fizzbuzz
```

Edit the loop bounds in `main.c` to print a different range.
