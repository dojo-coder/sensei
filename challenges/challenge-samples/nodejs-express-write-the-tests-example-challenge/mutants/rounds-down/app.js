const express = require('express');

const BASE_COST = 5;
const COST_PER_EXTRA_KG = 2;
const MAX_WEIGHT_KG = 30;

/**
 * Quotes a parcel: 5 for the first kilogram, 2 for every further kilogram started,
 * and twice that for express delivery.
 */
function quote(weightKg, express) {
  const extraKg = Math.max(0, Math.floor(weightKg) - 1);
  const cost = BASE_COST + extraKg * COST_PER_EXTRA_KG;

  return express ? cost * 2 : cost;
}

const app = express();
app.use(express.json());

app.post('/shipping/quote', (req, res) => {
  const { weightKg, express: isExpress = false } = req.body || {};

  if (typeof weightKg !== 'number' || !Number.isFinite(weightKg) || weightKg <= 0 || weightKg > MAX_WEIGHT_KG) {
    return res.status(400).json({ error: 'weightKg must be a number above 0 and at most 30' });
  }

  if (typeof isExpress !== 'boolean') {
    return res.status(400).json({ error: 'express must be true or false' });
  }

  return res.json({ cost: quote(weightKg, isExpress) });
});

module.exports = { app, quote };
