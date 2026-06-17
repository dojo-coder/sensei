import { items } from '$lib/items.js';

/**
 * Server-side load: runs on the server and passes data to +page.svelte.
 *
 * @type {import('./$types').PageServerLoad}
 */
export function load() {
  return { items };
}
