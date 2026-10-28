const request = require('supertest');
const { app } = require('./app');

describe('POST /shipping/quote', () => {
  it('charges the base cost for a 1 kg parcel', async () => {
    const response = await request(app).post('/shipping/quote').send({ weightKg: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ cost: 5 });
  });

  // Add tests until every hidden bug is caught.
});
