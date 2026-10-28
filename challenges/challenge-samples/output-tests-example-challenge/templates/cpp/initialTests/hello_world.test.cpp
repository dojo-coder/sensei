#include <catch2/catch_test_macros.hpp>
#include "dojo_io.hpp"

TEST_CASE("prints Hello World") {
    REQUIRE(dojo_run() == "Hello World");
}
