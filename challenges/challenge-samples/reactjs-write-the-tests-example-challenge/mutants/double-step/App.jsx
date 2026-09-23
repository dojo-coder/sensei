import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((current) => current + 2);
  const decrement = () => setCount((current) => (current > 0 ? current - 1 : current));
  const reset = () => setCount(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={decrement} disabled={count === 0}>
        Decrement
      </button>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
