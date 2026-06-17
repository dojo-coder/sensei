#[path = "app.rs"]
mod app;

fn main() {
    let result1 = app::longest_palindromic_substring("babad");
    println!("longest_palindromic_substring(\"babad\"): {}", result1);

    let result2 = app::longest_palindromic_substring("cbbd");
    println!("longest_palindromic_substring(\"cbbd\"): {}", result2);

    let result3 = app::longest_palindromic_substring("");
    println!("longest_palindromic_substring(\"\"): {}", result3);
}




