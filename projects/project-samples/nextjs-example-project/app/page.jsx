import { items } from "./items";

// Server Component: `items` is read on the server, so the list is
// rendered into the initial HTML (no client-side fetch required).
export default function Page() {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", maxWidth: 640, margin: "0 auto" }}>
      <h1>Items</h1>
      <p>
        Rendered server-side from the same data served by{" "}
        <a href="/api/items">/api/items</a>.
      </p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.done ? "✅" : "⬜"} {item.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
