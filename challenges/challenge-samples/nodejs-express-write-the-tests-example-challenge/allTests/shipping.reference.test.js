const request = require('supertest');
const { app } = require('./app');

const quote = (body) => request(app).post('/shipping/quote').send(body);

describe('POST /shipping/quote (reference suite)', () => {
  it('charges the base cost for a 1 kg parcel', async () => {
    const response = await quote({ weightKg: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ cost: 5 });
  });

  it('charges every started kilogram after the first', async () => {
    expect((await quote({ weightKg: 2.5 })).body).toEqual({ cost: 9 });
    expect((await quote({ weightKg: 2 })).body).toEqual({ cost: 7 });
  });

  it('doubles the cost for express delivery', async () => {
    expect((await quote({ weightKg: 2.5, express: true })).body).toEqual({ cost: 18 });
    expect((await quote({ weightKg: 2.5, express: false })).body).toEqual({ cost: 9 });
  });

  it('accepts a parcel of exactly 30 kg', async () => {
    const response = await quote({ weightKg: 30 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ cost: 63 });
  });

  it('rejects a parcel over 30 kg with 400', async () => {
    expect((await quote({ weightKg: 30.5 })).status).toBe(400);
  });

  it('rejects a missing, zero or non-number weight with 400', async () => {
    expect((await quote({})).status).toBe(400);
    expect((await quote({ weightKg: 0 })).status).toBe(400);
    expect((await quote({ weightKg: '2' })).status).toBe(400);
  });
});
