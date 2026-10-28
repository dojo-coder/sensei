use crate::dojo_io::run;

#[test]
fn prints_hello_world() {
    assert_eq!(run(""), "Hello World");
}
