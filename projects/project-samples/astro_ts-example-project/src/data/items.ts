export interface Item {
  id: number;
  name: string;
  description: string;
}

export const items: Item[] = [
  { id: 1, name: 'Astro', description: 'The web framework for content-driven sites.' },
  { id: 2, name: 'TypeScript', description: 'JavaScript with syntax for types.' },
  { id: 3, name: 'Vite', description: 'Next generation frontend tooling.' },
];
