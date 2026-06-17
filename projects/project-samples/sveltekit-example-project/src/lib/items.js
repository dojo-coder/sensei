/**
 * In-memory item catalogue shared by the page load function and the API
 * endpoint. In a real app this would come from a database or upstream service.
 *
 * @typedef {{ id: number, name: string, price: number }} Item
 * @type {Item[]}
 */
export const items = [
  { id: 1, name: 'Notebook', price: 4.5 },
  { id: 2, name: 'Pen', price: 1.25 },
  { id: 3, name: 'Backpack', price: 39.99 },
  { id: 4, name: 'Water Bottle', price: 12.0 }
];
