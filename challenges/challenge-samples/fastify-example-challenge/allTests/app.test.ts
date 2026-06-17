import { describe, it, expect, afterEach } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { buildApp } from './src/app';

describe('GET /', () => {
  let app: FastifyInstance;

  afterEach(async () => {
    await app?.close();
  });

  it("returns 'Hello, World!' with status 200", async () => {
    app = buildApp();
    const response = await app.inject({ method: 'GET', url: '/' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Hello, World!');
  });

  it('responds to GET /', async () => {
    app = buildApp();
    const response = await app.inject({ method: 'GET', url: '/' });
    expect(response.statusCode).toBe(200);
  });

  it('returns a non-empty body', async () => {
    app = buildApp();
    const response = await app.inject({ method: 'GET', url: '/' });
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('does NOT return JSON-wrapped variant', async () => {
    app = buildApp();
    const response = await app.inject({ method: 'GET', url: '/' });
    expect(response.body).not.toBe('{"message":"Hello, World!"}');
  });

  it('the body is case-sensitive', async () => {
    app = buildApp();
    const response = await app.inject({ method: 'GET', url: '/' });
    expect(response.body).not.toBe('hello, world!');
  });

  it('returns 404 for unknown routes', async () => {
    app = buildApp();
    const response = await app.inject({ method: 'GET', url: '/does-not-exist' });
    expect(response.statusCode).toBe(404);
  });
});
