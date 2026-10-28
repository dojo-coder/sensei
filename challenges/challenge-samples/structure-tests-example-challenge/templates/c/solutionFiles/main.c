#include <stdio.h>

int main(void) {
    int total = 0;
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) {
            total += i;
        }
        printf("%d\n", i);
    }
    (void)total;
    return 0;
}
