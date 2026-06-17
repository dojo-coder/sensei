#include <iostream>
#include <string>

// Returns the FizzBuzz representation of n:
//   - "FizzBuzz" if divisible by both 3 and 5
//   - "Fizz"     if divisible by 3
//   - "Buzz"     if divisible by 5
//   - the number itself otherwise
std::string fizzbuzz(int n) {
    if (n % 15 == 0) return "FizzBuzz";
    if (n % 3 == 0) return "Fizz";
    if (n % 5 == 0) return "Buzz";
    return std::to_string(n);
}

int main() {
    for (int i = 1; i <= 15; ++i) {
        std::cout << fizzbuzz(i) << std::endl;
    }
    return 0;
}
