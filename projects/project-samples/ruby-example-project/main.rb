# FizzBuzz: print one line per number from 1 to 15.
# - multiples of 3 and 5  -> "FizzBuzz"
# - multiples of 3        -> "Fizz"
# - multiples of 5        -> "Buzz"
# - everything else       -> the number itself

def fizzbuzz(n)
  if (n % 15).zero?
    "FizzBuzz"
  elsif (n % 3).zero?
    "Fizz"
  elsif (n % 5).zero?
    "Buzz"
  else
    n.to_s
  end
end

(1..15).each do |n|
  puts fizzbuzz(n)
end
