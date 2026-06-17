import { json } from '@sveltejs/kit';
import { getItems } from '$lib/items';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
  return json(getItems());
};
