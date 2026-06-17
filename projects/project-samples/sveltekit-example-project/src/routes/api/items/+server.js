import { json } from '@sveltejs/kit';
import { items } from '$lib/items.js';

/**
 * GET /api/items — returns the item catalogue as JSON.
 *
 * @type {import('./$types').RequestHandler}
 */
export function GET() {
  return json(items);
}
