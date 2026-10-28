using Xunit;

namespace Challenge
{
    public class HelloWorldTest
    {
        [Fact(DisplayName = "prints Hello World")]
        public void PrintsHelloWorld()
        {
            Assert.Equal("Hello World", DojoIO.Run());
        }
    }
}
