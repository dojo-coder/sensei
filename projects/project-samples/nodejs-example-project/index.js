/**
 * Returns the FizzBuzz value for a single number.
 *
 * - Multiples of 3 and 5  -> "FizzBuzz"
 * - Multiples of 3        -> "Fizz"
 * - Multiples of 5        -> "Buzz"
 * - Everything else       -> the number as a string
 *
 * @param {number} n
 * @returns {string}
 */
function fizzbuzz(n) {
  if (n % 15 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return String(n);
}

module.exports = {
  fizzbuzz,
};
