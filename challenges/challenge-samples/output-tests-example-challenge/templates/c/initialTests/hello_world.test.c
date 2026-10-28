#include <criterion/criterion.h>
#include "dojo_io.h"

Test(hello_world, prints_hello_world, .description = "prints Hello World") {
    cr_assert_str_eq(dojo_run(""), "Hello World");
}
