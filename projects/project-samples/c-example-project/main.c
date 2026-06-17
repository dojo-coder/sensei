#include <stdio.h>

/* Print the FizzBuzz value for a single number. */
void fizzbuzz(int n) {
    if (n % 15 == 0) {
        printf("FizzBuzz\n");
    } else if (n % 3 == 0) {
        printf("Fizz\n");
    } else if (n % 5 == 0) {
        printf("Buzz\n");
    } else {
        printf("%d\n", n);
    }
}

int main(void) {
    for (int i = 1; i <= 15; i++) {
        fizzbuzz(i);
    }
    return 0;
}
