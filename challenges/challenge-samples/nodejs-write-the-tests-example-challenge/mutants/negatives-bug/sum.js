function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('sum expects two numbers');
  }

  return Math.abs(a) + Math.abs(b);
}

module.exports = { sum };
