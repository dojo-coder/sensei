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
});
