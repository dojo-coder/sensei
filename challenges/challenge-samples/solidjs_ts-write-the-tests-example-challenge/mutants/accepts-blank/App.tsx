import { createSignal, For } from 'solid-js';

export default function App() {
  const [items, setItems] = createSignal<string[]>([]);
  const [draft, setDraft] = createSignal('');

  const addTodo = (): void => {
    const text = draft().trim();

    if (items().some((item) => item.toLowerCase() === text.toLowerCase())) return;

    setItems([...items(), text]);
    setDraft('');
  };

  return (
    <div>
      <h1>Todos ({items().length})</h1>
      <input
        placeholder="What needs to be done?"
        value={draft()}
        onInput={(event) => setDraft(event.currentTarget.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        <For each={items()}>{(item) => <li>{item}</li>}</For>
      </ul>
    </div>
  );
}
