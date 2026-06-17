import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

const ITEMS = [
  { id: 1, name: 'Write a loader', done: true },
  { id: 2, name: 'Render with useLoaderData', done: true },
  { id: 3, name: 'Add a resource route', done: false }
];

export const meta = () => {
  return [{ title: 'Remix Items App' }];
};

export const loader = async () => {
  // In a real app this is where you'd query a database or call an API.
  return json({ items: ITEMS });
};

export default function Index() {
  const { items } = useLoaderData();

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 480, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Remix Items App</h1>
      <p>
        This list is loaded on the server by the route&apos;s <code>loader</code> and rendered with{' '}
        <code>useLoaderData</code>.
      </p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input type="checkbox" checked={item.done} readOnly /> {item.name}
          </li>
        ))}
      </ul>
      <p>
        The same data is also available as JSON at <a href="/api/items">/api/items</a>.
      </p>
    </main>
  );
}
