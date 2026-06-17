import { items, type Item } from "./items";

export default function Page() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", maxWidth: 640, margin: "0 auto" }}>
      <h1>Items</h1>
      <p>
        A typed list of items rendered on the server. The same data is served as JSON from{" "}
        <a href="/api/items">/api/items</a>.
      </p>
      <ul>
        {items.map((item: Item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> — {item.description}
          </li>
        ))}
      </ul>
    </main>
  );
}
