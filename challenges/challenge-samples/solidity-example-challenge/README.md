In this challenge, you will complete the implementation of a basic voting system. You are given a preloaded contract with some functionality missing. Your task is to complete the problem by adding key features.

### Requirements:

1. **Add a Candidate**:

   * Only the owner of the contract (the deployer) should be able to add candidates to the election.
   * Candidates should be stored in the `candidates` array.
   * Each candidate should be initialized with 0 votes in the `votes` mapping.

2. **Get All Candidates**:

   * Implement a function `getAllCandidates` that returns an array of all the candidate names.

3. **Get Vote Count for a Candidate**:

   * Implement the function `getVotes` to return the number of votes for a specific candidate.

4. **Voting Functionality**:

   * Implement a `vote` function that allows an address to vote for a candidate.
   * The voter should only be able to vote once. If they have already voted, the transaction should revert with the message: "You have already voted"
   * If the voter has already voted, the transaction should be reverted with an error message.
   * Ensure that only valid candidates can receive votes by checking that the candidate exists before accepting a vote.

5. **Check for Existing Candidate** (Advanced):

   * Implement a modifier `candidateExists` to ensure that a vote can only be cast for valid candidates.
   * If the candidate does not exist, the transaction should revert with the message: "Candidate does not exist"