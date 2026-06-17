# C++ FizzBuzz

A tiny C++ terminal sandbox that prints **FizzBuzz** for the numbers `1` through `15`.

## Files

- `main.cpp` — the `fizzbuzz(int)` helper plus an `int main()` loop that prints each result with `std::cout`

## The rules

For each number `1..15`:

- print `Fizz` if it is divisible by 3
- print `Buzz` if it is divisible by 5
- print `FizzBuzz` if it is divisible by both 3 and 5
- otherwise print the number itself

## Run locally

```bash
g++ -std=c++17 -o fizzbuzz main.cpp
./fizzbuzz
```

Expected output:

```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```
