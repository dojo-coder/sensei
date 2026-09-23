import React, { useState } from "react";

const App: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [draft, setDraft] = useState("");

  const addTodo = (): void => {
    const text = draft.trim();

    if (text.length === 0) return;

    if (items.some((item) => item.toLowerCase() === text.toLowerCase())) return;

    setItems([...items, text]);
    setDraft("");
  };

  return (
    <div>
      <h1>Todos ({items.length})</h1>
      <input
        placeholder="What needs to be done?"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
