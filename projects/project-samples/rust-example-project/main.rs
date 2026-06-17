/// Returns the FizzBuzz string for a given number.
///
/// - Multiples of 15 -> "FizzBuzz"
/// - Multiples of 3  -> "Fizz"
/// - Multiples of 5  -> "Buzz"
/// - Otherwise       -> the number itself
fn fizzbuzz(n: u32) -> String {
    match (n % 3, n % 5) {
        (0, 0) => "FizzBuzz".to_string(),
        (0, _) => "Fizz".to_string(),
        (_, 0) => "Buzz".to_string(),
        _ => n.to_string(),
    }
}

fn main() {
    for n in 1..=15 {
        println!("{}", fizzbuzz(n));
    }
}
