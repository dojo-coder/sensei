import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((current) => current + 1);
  const decrement = () => setCount((current) => current - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={decrement}>
        Decrement
      </button>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
