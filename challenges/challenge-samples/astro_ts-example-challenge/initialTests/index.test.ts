import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Page from './src/pages/index.astro';

describe('index.astro', () => {
  it('renders an <h1> containing "Hello, World!"', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Page);
    expect(html).toMatch(/<h1[^>]*>\s*Hello, World!\s*<\/h1>/);
  });

  it('includes the <html lang="en"> root', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Page);
    expect(html).toMatch(/<html[^>]*lang="en"/);
  });

  it('declares UTF-8 charset', async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Page);
    expect(html).toMatch(/<meta[^>]*charset="UTF-8"/i);
  });
});
