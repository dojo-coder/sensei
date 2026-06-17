import Fastify, { type FastifyInstance } from 'fastify';

export function buildApp(): FastifyInstance {
  const app = Fastify({ logger: false });

  // TODO: register a GET / route that returns the text 'Hello, World!'

  return app;
}
