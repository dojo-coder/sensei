import { Hono } from 'hono';

export const app = new Hono();

/**
 * Turns free text into a URL slug: trimmed, lowercased, non-alphanumeric runs
 * collapsed into single dashes, no leading or trailing dash.
 */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
}

app.get('/slug', (c) => {
  const text = c.req.query('text');

  if (!text || text.trim().length === 0) {
    return c.json({ error: 'text query parameter is required' }, 400);
  }

  return c.json({ slug: slugify(text) });
});
