import { describe, it, expect } from 'vitest';
import { app } from './src/app';

describe('GET /', () => {
  it("returns 'Hello, World!' with status 200", async () => {
    const response = await app.request('/');
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('Hello, World!');
  });

  it('responds to GET /', async () => {
    const response = await app.request('/');
    expect(response.status).toBe(200);
  });

  it('returns a non-empty body', async () => {
    const response = await app.request('/');
    expect((await response.text()).length).toBeGreaterThan(0);
  });

  it('does NOT return JSON-wrapped variant', async () => {
    const response = await app.request('/');
    const body = await response.text();
    expect(body).not.toBe('{"message":"Hello, World!"}');
  });

  it('the body is case-sensitive', async () => {
    const response = await app.request('/');
    expect(await response.text()).not.toBe('hello, world!');
  });

  it('returns 404 for unknown routes', async () => {
    const response = await app.request('/does-not-exist');
    expect(response.status).toBe(404);
  });
});
