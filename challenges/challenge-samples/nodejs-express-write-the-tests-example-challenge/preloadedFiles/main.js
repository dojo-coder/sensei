// The Run button runs this file: a few quotes, printed. The server itself starts in index.js.
const { quote } = require('./app');

for (const [weightKg, express] of [
  [1, false],
  [2.5, false],
  [2.5, true],
  [30, false],
]) {
  console.log(`quote(${weightKg}, ${express}):`, quote(weightKg, express));
}
