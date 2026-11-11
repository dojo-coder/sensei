Write a program that prints the numbers from 1 to 5, one per line. While it counts, the program also adds up the even numbers in a variable named `total`.

### Rules & clarifications

- Use a `for` loop to go through the numbers from 1 to 5. Do not use `while`.
- Inside the loop, use one `if` to check whether the number is even: a number is even when the remainder of dividing it by 2 is 0 (operator `%`).
- When the number is even, add it to `total`. The variable `total` starts at 0.
- The program prints only the five numbers. It does not print `total`.
- Write the program in `main.php`. No function is needed.
- The tests run your program and compare what it prints with the expected text, character by character.

### What the tests check

- The printed text is exactly the one in the example.
- The program uses a `for` loop and no `while`, with exactly one `if` inside the loop.
- The variable `total` is declared and is updated inside the loop.

### Example

The program prints:

```
1
2
3
4
5
```

At the end, `total` has the value `6` _(2 + 4)_.
