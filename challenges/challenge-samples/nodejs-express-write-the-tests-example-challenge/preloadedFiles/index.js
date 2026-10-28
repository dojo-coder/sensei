// The editor preview and the API tester run this file: it starts the server.
const { app } = require('./app');

app.listen(3000, () => {
  console.log('Shipping API listening on http://localhost:3000');
  console.log('Try: POST /shipping/quote with the body { "weightKg": 2.5, "express": true }');
});
