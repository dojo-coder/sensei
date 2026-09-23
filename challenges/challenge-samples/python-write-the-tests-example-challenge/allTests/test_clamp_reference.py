import pytest
from pytest import mark as m
from challenge.clamp import clamp


@m.describe("clamp (reference suite)")
class TestClampReference:
    @m.it("Returns the value when it is inside the range")
    def test_inside_range(self):
        assert clamp(5, 0, 10) == 5

    @m.it("Clamps values below the lower bound up to low")
    def test_below_low(self):
        assert clamp(-5, 0, 10) == 0

    @m.it("Clamps values above the upper bound down to high")
    def test_above_high(self):
        assert clamp(15, 0, 10) == 10

    @m.it("Raises ValueError when low is greater than high")
    def test_invalid_range(self):
        with pytest.raises(ValueError):
            clamp(5, 10, 0)
