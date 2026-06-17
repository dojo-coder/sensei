import { json } from '@remix-run/node';

const ITEMS = [
  { id: 1, name: 'Write a loader', done: true },
  { id: 2, name: 'Render with useLoaderData', done: true },
  { id: 3, name: 'Add a resource route', done: false }
];

// Resource route: no default component is exported, so Remix treats this as a
// plain data endpoint. GET /api/items returns the items as JSON.
export const loader = async () => {
  return json({ items: ITEMS });
};
