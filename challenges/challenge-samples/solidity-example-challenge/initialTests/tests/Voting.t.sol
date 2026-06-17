// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "forge-std/Test.sol";
import "../src/Voting.sol";

contract VotingTest is Test {
    Voting voting;
    address voter;

    function setUp() public {
        // The test contract deploys Voting, so address(this) is the owner.
        voting = new Voting();
        voter = address(0xB0B);
    }

    /// Should add a candidate by the owner
    function testOwnerCanAddCandidate() public {
        voting.addCandidate("Alice");
        string[] memory candidates = voting.getAllCandidates();
        assertEq(candidates[0], "Alice");
    }

    /// Should prevent non-owner from adding candidates
    function testNonOwnerCannotAddCandidate() public {
        vm.prank(voter);
        vm.expectRevert(bytes("Only owner can perform this action"));
        voting.addCandidate("Bob");
    }

    /// Should allow a user to vote for a candidate
    function testUserCanVote() public {
        voting.addCandidate("Alice");
        vm.prank(voter);
        voting.vote("Alice");
        assertEq(voting.getVotes("Alice"), 1);
    }

    /// Should prevent double voting
    function testPreventDoubleVoting() public {
        voting.addCandidate("Alice");
        vm.prank(voter);
        voting.vote("Alice");
        vm.prank(voter);
        vm.expectRevert(bytes("You have already voted"));
        voting.vote("Alice");
    }

    /// Should prevent voting for a non-existent candidate
    function testRevertsOnUnknownCandidate() public {
        vm.prank(voter);
        vm.expectRevert(bytes("Candidate does not exist"));
        voting.vote("Bob");
    }
}
