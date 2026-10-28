namespace Challenge
{
    class Program
    {
        static void Main(string[] args)
        {
            int total = 0;
            for (int i = 1; i <= 5; i++)
            {
                if (i % 2 == 0)
                {
                    total += i;
                }
                Console.WriteLine(i);
            }
        }
    }
}
