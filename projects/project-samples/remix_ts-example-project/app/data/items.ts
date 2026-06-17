export type Item = {
  id: number;
  name: string;
  description: string;
};

const items: Item[] = [
  { id: 1, name: 'Loaders', description: 'Read data on the server before a route renders.' },
  { id: 2, name: 'Actions', description: 'Handle form submissions and mutations on the server.' },
  { id: 3, name: 'Resource routes', description: 'Routes without a component that return raw data (e.g. JSON).' },
  { id: 4, name: 'Nested routes', description: 'Compose layouts and UI from the URL segments.' }
];

export function getItems(): Item[] {
  return items;
}
