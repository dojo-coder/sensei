# C# FizzBuzz

A small C# terminal sandbox that prints **FizzBuzz** for the numbers 1 through 15.

## Files

- `Main.cs` — entry point (`Program.Main`) plus the `FizzBuzz(int)` helper

## The rules

For each number from 1 to 15:

- multiples of **3** print `Fizz`
- multiples of **5** print `Buzz`
- multiples of **both 3 and 5** print `FizzBuzz`
- everything else prints the number itself

## Run locally

```bash
dotnet run
```

Or compile and run directly:

```bash
csc Main.cs && ./Main
```

Edit the loop bound in `Main` or the `FizzBuzz(int)` helper to experiment.
