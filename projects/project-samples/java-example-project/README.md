# Java FizzBuzz

A small, runnable Java sandbox that prints **FizzBuzz** for the numbers `1` through `15`.

## Files

- `Main.java` — `public class Main` with a `fizzBuzz(int)` helper and a `main` that prints each line.

## The rules

For each number from 1 to 15:

- divisible by both 3 and 5 → `FizzBuzz`
- divisible by 3 → `Fizz`
- divisible by 5 → `Buzz`
- otherwise → the number itself

## Run locally

```bash
javac Main.java
java Main
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
