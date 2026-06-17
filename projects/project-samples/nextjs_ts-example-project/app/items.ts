export type Item = {
  id: number;
  name: string;
  description: string;
};

export const items: Item[] = [
  { id: 1, name: "Keyboard", description: "Mechanical, 75% layout" },
  { id: 2, name: "Mouse", description: "Wireless, ergonomic" },
  { id: 3, name: "Monitor", description: "27-inch, 144Hz" },
];
