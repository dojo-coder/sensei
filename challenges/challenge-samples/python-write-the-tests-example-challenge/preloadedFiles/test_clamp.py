from pytest import mark as m
from challenge.clamp import clamp


@m.describe("clamp")
class TestClamp:
    @m.it("Returns the value when it is inside the range")
    def test_inside_range(self):
        assert clamp(5, 0, 10) == 5

    # Add tests until every hidden bug is caught.
