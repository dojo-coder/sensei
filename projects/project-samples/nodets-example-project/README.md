# Node.js TypeScript FizzBuzz

A small Node.js + TypeScript terminal sandbox that prints **FizzBuzz** for the numbers `1..15`.

## Files

- `index.ts` — exports the typed helper `fizzbuzz(n: number): string`
- `main.ts` — the entry point; imports `fizzbuzz` and prints each line for `1..15`
- `tsconfig.json` — TypeScript compiler configuration
- `package.json` — minimal scripts and dev dependencies

## The rule

For each number `n` from 1 to 15:

- multiple of both 3 and 5 → `FizzBuzz`
- multiple of 3 → `Fizz`
- multiple of 5 → `Buzz`
- otherwise → the number itself

## Run locally

```bash
npm install
npm start
```

Then edit `index.ts` to change the rule, or `main.ts` to change the range.
