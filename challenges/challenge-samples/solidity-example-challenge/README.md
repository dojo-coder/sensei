The contract `Voting` runs a simple election: the owner adds candidates, and every address can vote once for one of them. The state variables, the constructor and the function headers are given.

Complete the contract:

a. `addCandidate(_name)` adds a candidate to the election.

b. `getAllCandidates()` returns the names of all the candidates.

c. `getVotes(_candidate)` returns the number of votes of a candidate.

d. `vote(_candidate)` records the vote of the caller.

e. The modifier `candidateExists(_candidate)` lets a function run only for a candidate that was added.

### Rules & clarifications

- The owner is the address that deployed the contract. The constructor stores it in `owner`.
- Only the owner can add a candidate. A call to `addCandidate` from any other address reverts with the message `Only owner can perform this action`.
- `addCandidate` appends the name to the array `candidates`. A new candidate has `0` votes in the mapping `votes`.
- `getAllCandidates` returns the names in the order in which they were added.
- `vote` adds `1` to the votes of the candidate and marks the caller in the mapping `hasVoted`.
- An address can vote only once. A second call to `vote` from the same address reverts with the message `You have already voted`.
- A vote for a name that was not added reverts with the message `Candidate does not exist`.
- The three messages must match exactly.
- Write the code in `src/Voting.sol`. Press **Run** to execute `Main.s.sol`, which deploys the contract, adds two candidates and casts one vote.

### Examples

- The owner calls `addCandidate("Alice")` → `getAllCandidates()` returns `["Alice"]` _(the name is appended to `candidates`)_.
- Another address then calls `vote("Alice")` → `getVotes("Alice")` returns `1`.
- The same address calls `vote("Alice")` again → the call reverts with `You have already voted`.
- An address calls `vote("Bob")`, and `Bob` was not added → the call reverts with `Candidate does not exist`.
- An address that is not the owner calls `addCandidate("Bob")` → the call reverts with `Only owner can perform this action`.
