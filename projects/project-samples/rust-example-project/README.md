# Rust FizzBuzz

A tiny, runnable Rust sandbox that prints the classic **FizzBuzz** sequence for the numbers `1..=15`.

## How it works

- `fizzbuzz(n: u32) -> String` returns the FizzBuzz value for a single number:
  - multiples of **15** → `"FizzBuzz"`
  - multiples of **3** → `"Fizz"`
  - multiples of **5** → `"Buzz"`
  - anything else → the number itself
- `main()` loops over `1..=15` and prints each line.

## Run it

```
cargo run
```

(or run `main.rs` directly in the DojoCode editor)

## Expected output

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

## Try it yourself

- Extend the range past `15`.
- Add a custom rule (e.g. `"Bazz"` for multiples of 7).
- Refactor `fizzbuzz` to return a `&'static str` where possible.
