import Fastify, { type FastifyInstance } from 'fastify';

export interface Item {
  id: number;
  name: string;
}

const items: Item[] = [
  { id: 1, name: 'Keyboard' },
  { id: 2, name: 'Mouse' },
  { id: 3, name: 'Monitor' },
];

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: false });

  app.get('/', async () => {
    return 'Hello, World!';
  });

  app.get('/items', async () => {
    return items;
  });

  app.get<{ Params: { id: string } }>('/items/:id', async (request, reply) => {
    const id = Number(request.params.id);
    const item = items.find((entry) => entry.id === id);

    if (!item) {
      return reply.code(404).send({ message: `Item ${request.params.id} not found` });
    }

    return item;
  });

  return app;
}
