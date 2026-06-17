import { Hono } from 'hono';

export const app = new Hono();

type Item = {
  id: number;
  name: string;
};

// Simple in-memory data store.
const items: Item[] = [
  { id: 1, name: 'Notebook' },
  { id: 2, name: 'Pencil' },
  { id: 3, name: 'Eraser' },
];

// Greeting route.
app.get('/', (c) => c.text('Hello from the Hono Items API!'));

// List all items.
// Hono handlers MUST return the c.json() / c.text() call.
app.get('/items', (c) => c.json(items));

// Fetch a single item by id.
app.get('/items/:id', (c) => {
  const id = Number(c.req.param('id'));
  const item = items.find((entry) => entry.id === id);

  if (!item) {
    return c.json({ error: 'Item not found' }, 404);
  }

  return c.json(item);
});
