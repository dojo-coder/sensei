// Shared in-memory data used by both the home page (server-side)
// and the /api/items Route Handler. Swap this out for a real
// data source (database, external API, etc.) as you build.
export const items = [
  { id: 1, name: "Write a Route Handler", done: true },
  { id: 2, name: "Render data server-side", done: true },
  { id: 3, name: "Add a database", done: false },
  { id: 4, name: "Deploy the app", done: false },
];
