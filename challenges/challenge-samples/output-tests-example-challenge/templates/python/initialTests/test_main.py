from pytest import mark as m
from challenge.dojo_io import run


@m.describe("Hello World")
class TestHelloWorld:
    @m.it("prints Hello World")
    def test_prints_hello_world(self):
        assert run() == "Hello World"
