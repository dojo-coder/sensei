import { getItems } from '$lib/items';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
  return {
    items: getItems()
  };
};
