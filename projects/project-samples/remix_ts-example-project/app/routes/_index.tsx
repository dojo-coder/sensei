import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getItems } from '~/data/items';

export const meta: MetaFunction = () => {
  return [
    { title: 'Remix TypeScript Items App' },
    { name: 'description', content: 'A typed Remix loader rendering a list of items.' }
  ];
};

export const loader = () => {
  const items = getItems();
  return json({ items });
};

export default function Index() {
  const { items } = useLoaderData<typeof loader>();

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', lineHeight: 1.5, padding: '2rem', maxWidth: 640, margin: '0 auto' }}>
      <h1>Remix Items</h1>
      <p>
        Loaded on the server via a typed <code>loader</code> and rendered with{' '}
        <code>useLoaderData</code>. The same data is available as JSON at{' '}
        <a href="/api/items">/api/items</a>.
      </p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> — {item.description}
          </li>
        ))}
      </ul>
    </main>
  );
}
