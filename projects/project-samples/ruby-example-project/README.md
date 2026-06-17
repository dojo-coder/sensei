# Ruby FizzBuzz

A tiny, runnable Ruby sandbox that prints **FizzBuzz** for the numbers `1` through `15`.

## Rules

For each number `n` from 1 to 15:

- multiples of both 3 and 5 print `FizzBuzz`
- multiples of 3 print `Fizz`
- multiples of 5 print `Buzz`
- any other number prints the number itself

## Run

```bash
ruby main.rb
```

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

## Try it

- Change the range in `main.rb` (e.g. `(1..100)`) to print further.
- Swap the `if/elsif` for string building (`s = ""; s << "Fizz" if ...`) as an exercise.
