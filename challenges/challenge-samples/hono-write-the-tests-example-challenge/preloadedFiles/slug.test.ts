import { describe, it, expect } from 'vitest';
import { app } from './src/app';

describe('GET /slug', () => {
  it('turns spaces into dashes', async () => {
    const response = await app.request('/slug?text=hello%20world');
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ slug: 'hello-world' });
  });

  // Add tests until every hidden bug is caught.
});
