export interface Item {
  id: number;
  name: string;
  price: number;
}

// In a real app this would come from a database or upstream API.
const items: Item[] = [
  { id: 1, name: 'Keyboard', price: 49.99 },
  { id: 2, name: 'Mouse', price: 24.5 },
  { id: 3, name: 'Monitor', price: 199.0 },
  { id: 4, name: 'Webcam', price: 79.95 }
];

export function getItems(): Item[] {
  return items;
}
