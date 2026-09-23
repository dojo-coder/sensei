import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp, type CartItem } from './src/app';

describe('POST /cart/total (reference suite)', () => {
  let app: FastifyInstance;

  beforeEach(() => {
    app = buildApp();
  });

  afterEach(async () => {
    await app.close();
  });

  const total = (items: unknown): Promise<{ statusCode: number; body: unknown }> =>
    app.inject({ method: 'POST', url: '/cart/total', payload: { items } }).then((response) => ({
      statusCode: response.statusCode,
      body: response.json()
    }));

  it('sums two items', async () => {
    const items: CartItem[] = [
      { price: 2.5, qty: 2 },
      { price: 1.25, qty: 4 }
    ];
    expect(await total(items)).toEqual({ statusCode: 200, body: { total: 10 } });
  });

  it('counts a single item', async () => {
    expect(await total([{ price: 3, qty: 1 }])).toEqual({ statusCode: 200, body: { total: 3 } });
  });

  it('multiplies price by quantity', async () => {
    expect(await total([{ price: 2, qty: 3 }])).toEqual({ statusCode: 200, body: { total: 6 } });
  });

  it('rounds the total to cents', async () => {
    expect(await total([{ price: 0.1, qty: 3 }])).toEqual({ statusCode: 200, body: { total: 0.3 } });
  });

  it('rejects an empty cart with 400', async () => {
    const response = await total([]);
    expect(response.statusCode).toBe(400);
  });

  it('rejects a quantity below 1 with 400', async () => {
    const response = await total([{ price: 2, qty: 0 }]);
    expect(response.statusCode).toBe(400);
  });
});
