namespace Project
{
    public class Program
    {
        // Returns the FizzBuzz value for a single number:
        // "Fizz" for multiples of 3, "Buzz" for multiples of 5,
        // "FizzBuzz" for multiples of both, otherwise the number itself.
        public static string FizzBuzz(int n)
        {
            if (n % 15 == 0) return "FizzBuzz";
            if (n % 3 == 0) return "Fizz";
            if (n % 5 == 0) return "Buzz";
            return n.ToString();
        }

        public static void Main(string[] args)
        {
            for (int i = 1; i <= 15; i++)
            {
                Console.WriteLine(FizzBuzz(i));
            }
        }
    }
}
