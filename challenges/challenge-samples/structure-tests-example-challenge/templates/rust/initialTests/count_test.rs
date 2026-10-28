use crate::dojo_io::{calls, count, declares, run, uses};

#[test]
fn prints_one_to_five() {
    assert_eq!(run(""), "1\n2\n3\n4\n5");
}

#[test]
fn uses_a_for_loop() {
    assert!(uses("for"), "use a for loop to count");
}

#[test]
fn does_not_use_while() {
    assert!(!uses("while"));
}

#[test]
fn has_one_if_inside_the_loop() {
    assert_eq!(count("if@for"), 1);
}

#[test]
fn calls_println() {
    assert!(calls("println!"));
}

#[test]
fn declares_and_updates_total() {
    assert!(declares("total"));
    assert!(uses("update:total@for"));
}
