from pytest import mark as m
from challenge.dojo_io import run, uses, count, calls, declares


@m.describe("Count to five")
class TestCountToFive:
    @m.it("prints 1 to 5")
    def test_prints_one_to_five(self):
        assert run() == "1\n2\n3\n4\n5"

    @m.it("uses a for loop")
    def test_uses_a_for_loop(self):
        assert uses("for"), "Use a for loop to count"

    @m.it("does not use while")
    def test_does_not_use_while(self):
        assert not uses("while")

    @m.it("has one if inside the loop")
    def test_has_one_if_inside_the_loop(self):
        assert count("if@for") == 1

    @m.it("calls print")
    def test_calls_print(self):
        assert calls("print")

    @m.it("declares and updates total")
    def test_declares_and_updates_total(self):
        assert declares("total")
        assert uses("update:total@for")
        assert uses("operator:%")
