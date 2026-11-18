#include <iostream>
using namespace std;

int main() {
    int total = 0;
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) {
            total += i;
        }
        cout << i << endl;
    }
    return 0;
}
