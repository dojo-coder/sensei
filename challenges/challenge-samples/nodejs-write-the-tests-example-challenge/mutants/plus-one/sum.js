function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('sum expects two numbers');
  }

  return a + b + 1;
}

module.exports = { sum };
