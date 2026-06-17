import { items } from '../../data/items.js';

// Astro endpoint: GET /api/items.json -> returns the items as JSON.
export function GET() {
  return new Response(JSON.stringify(items), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
