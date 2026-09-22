import Fastify, { type FastifyInstance } from 'fastify';

export interface CartItem {
  price: number;
  qty: number;
}

interface CartBody {
  items?: CartItem[];
}

/**
 * Sums price × qty over the items, rounded to cents.
 */
export function cartTotal(items: CartItem[]): number {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return Math.round(total * 100) / 100;
}

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: false });

  app.post<{ Body: CartBody }>('/cart/total', async (request, reply) => {
    const items = request.body?.items;

    if (!Array.isArray(items) || items.length === 0) {
      return reply.code(400).send({ error: 'items must be a non-empty array' });
    }

    const isValidItem = (item: CartItem): boolean =>
      Number.isFinite(item.price) && item.price >= 0 && Number.isInteger(item.qty) && item.qty >= 1;

    if (!items.every(isValidItem)) {
      return reply.code(400).send({ error: 'each item needs a non-negative price and a positive integer qty' });
    }

    return { total: cartTotal(items) };
  });

  return app;
}
