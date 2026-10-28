#include <iostream>

int main() {
    int total = 0;
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) {
            total += i;
        }
        std::cout << i << std::endl;
    }
    return 0;
}
