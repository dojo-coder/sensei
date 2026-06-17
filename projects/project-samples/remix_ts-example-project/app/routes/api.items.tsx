import { json } from '@remix-run/node';
import { getItems } from '~/data/items';

export const loader = () => {
  const items = getItems();
  return json({ items });
};
