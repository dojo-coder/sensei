import { createSignal } from 'solid-js';

export default function App() {
  const [count, setCount] = createSignal(0);

  const increment = () => setCount((current) => current + 1);
  const decrement = () => setCount((current) => (current > 0 ? current - 1 : current));
  const reset = () => setCount((current) => (current > 1 ? 0 : current));

  return (
    <div>
      <p>Count: {count()}</p>
      <button onClick={decrement} disabled={count() === 0}>
        Decrement
      </button>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
