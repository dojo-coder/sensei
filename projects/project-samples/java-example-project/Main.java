public class Main {
    /**
     * Returns the FizzBuzz value for a single number:
     * "FizzBuzz" if divisible by 15, "Fizz" if divisible by 3,
     * "Buzz" if divisible by 5, otherwise the number itself.
     */
    public static String fizzBuzz(int n) {
        if (n % 15 == 0) return "FizzBuzz";
        if (n % 3 == 0) return "Fizz";
        if (n % 5 == 0) return "Buzz";
        return Integer.toString(n);
    }

    public static void main(String[] args) {
        for (int i = 1; i <= 15; i++) {
            System.out.println(fizzBuzz(i));
        }
    }
}
