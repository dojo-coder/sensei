import { describe, it, expect, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from './src/app';

describe('POST /cart/total', () => {
  let app: FastifyInstance;

  afterEach(async () => {
    await app?.close();
  });

  it('sums two items', async () => {
    app = buildApp();
    const response = await app.inject({
      method: 'POST',
      url: '/cart/total',
      payload: { items: [{ price: 2.5, qty: 2 }, { price: 1.25, qty: 4 }] }
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ total: 10 });
  });

  // Add tests until every hidden bug is caught.
});
