#include <catch2/catch_test_macros.hpp>
#include "dojo_io.hpp"

TEST_CASE("prints 1 to 5") {
    REQUIRE(dojo_run() == "1\n2\n3\n4\n5");
}

TEST_CASE("uses a for loop") {
    REQUIRE(dojo_uses("for"));
}

TEST_CASE("does not use while") {
    REQUIRE_FALSE(dojo_uses("while"));
}

TEST_CASE("has one if inside the loop") {
    REQUIRE(dojo_count("if@for", "main") == 1);
}

TEST_CASE("calls cout") {
    REQUIRE(dojo_calls("cout"));
}

TEST_CASE("declares and updates total") {
    REQUIRE(dojo_declares("total"));
    REQUIRE(dojo_uses("update:total@for"));
}
