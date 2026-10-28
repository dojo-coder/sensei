#include <criterion/criterion.h>
#include "dojo_io.h"

Test(count, prints_one_to_five, .description = "prints 1 to 5") {
    cr_assert_str_eq(dojo_run(""), "1\n2\n3\n4\n5");
}

Test(count, uses_a_for_loop, .description = "uses a for loop") {
    cr_assert(dojo_uses("for"), "Use a for loop to count");
}

Test(count, does_not_use_while, .description = "does not use while") {
    cr_assert_not(dojo_uses("while"));
}

Test(count, has_one_if_inside_the_loop, .description = "has one if inside the loop") {
    cr_assert_eq(dojo_count_in("if@for", "main"), 1);
}

Test(count, calls_printf, .description = "calls printf") {
    cr_assert(dojo_calls("printf"));
}

Test(count, declares_and_updates_total, .description = "declares and updates total") {
    cr_assert(dojo_declares_in("total", "main"));
    cr_assert(dojo_uses("update:total@for"));
}
