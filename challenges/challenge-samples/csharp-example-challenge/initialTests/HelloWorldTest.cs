using Xunit;

namespace Challenge
{
    public class HelloWorldTest
    {
        [Fact(DisplayName = "It should return 'Hello World!'")]
        public void TestHelloWorld()
        {
            Assert.Equal("Hello World!", HelloWorld.Hello());
        }
    }
}
