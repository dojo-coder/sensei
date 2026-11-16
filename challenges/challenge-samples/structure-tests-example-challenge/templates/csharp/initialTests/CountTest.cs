using Xunit;

namespace Challenge
{
    public class CountTest
    {
        [Fact(DisplayName = "prints 1 to 5")]
        public void PrintsOneToFive()
        {
            Assert.Equal("1\n2\n3\n4\n5", DojoIO.Run());
        }

        [Fact(DisplayName = "uses a for loop")]
        public void UsesAForLoop()
        {
            Assert.True(DojoIO.Uses("for"));
        }

        [Fact(DisplayName = "does not use while")]
        public void DoesNotUseWhile()
        {
            Assert.False(DojoIO.Uses("while"));
        }

        [Fact(DisplayName = "has one if inside the loop")]
        public void HasOneIfInsideTheLoop()
        {
            Assert.Equal(1, DojoIO.Count("if@for", "Main"));
        }

        [Fact(DisplayName = "calls Console.WriteLine")]
        public void CallsWriteLine()
        {
            Assert.True(DojoIO.Calls("Console.WriteLine"));
        }

        [Fact(DisplayName = "keeps a running total in a variable")]
        public void KeepsARunningTotalInAVariable()
        {
            Assert.True(DojoIO.Uses("value:0"));
            Assert.True(DojoIO.Count("update@for") >= 2);
        }
    }
}
