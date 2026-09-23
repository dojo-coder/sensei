import { describe, it, expect } from 'vitest';
import { app } from './src/app';

describe('GET /slug (reference suite)', () => {
  const slug = async (text: string): Promise<{ status: number; body: unknown }> => {
    const response = await app.request(`/slug?text=${encodeURIComponent(text)}`);

    return { status: response.status, body: await response.json() };
  };

  it('turns spaces into dashes', async () => {
    expect(await slug('hello world')).toEqual({ status: 200, body: { slug: 'hello-world' } });
  });

  it('lowercases the text', async () => {
    expect(await slug('DojoCode')).toEqual({ status: 200, body: { slug: 'dojocode' } });
  });

  it('collapses punctuation and strips leading/trailing dashes', async () => {
    expect(await slug('  Hello, World!  ')).toEqual({ status: 200, body: { slug: 'hello-world' } });
  });

  it('rejects a missing text parameter with 400', async () => {
    const response = await app.request('/slug');
    expect(response.status).toBe(400);
  });

  it('rejects an empty text parameter with 400', async () => {
    expect((await slug('')).status).toBe(400);
    expect((await slug('   ')).status).toBe(400);
  });
});
