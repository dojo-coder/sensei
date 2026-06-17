A small, self-contained Solidity sandbox built on Foundry. It contains a clean `Counter` contract and a forge script that deploys it and exercises its state.

### What's inside

- **`src/Counter.sol`** — a minimal contract holding a single `number`, with:
  - `increment()` — adds one and emits `NumberChanged`.
  - `decrement()` — subtracts one (reverts below zero) and emits `NumberChanged`.
  - `setNumber(uint256)` — sets `number` to an arbitrary value and emits `NumberChanged`.
- **`Main.s.sol`** — a `forge` script that deploys the `Counter`, then calls `increment`, `decrement`, and `setNumber`, logging the value at each step with `console.log`.

### Running

The script is run with Foundry's `forge`:

```
forge script Main.s.sol
```

This is a free-form sandbox: edit the contract, add functions, and rerun the script to see your changes.
