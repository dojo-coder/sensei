fn main() {
    let mut total = 0;
    for i in 1..=5 {
        if i % 2 == 0 {
            total += i;
        }
        println!("{}", i);
    }
    let _ = total;
}
