// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "./src/Voting.sol";

contract Main is Script {
    function run() external {
        Voting voting = new Voting();
        console.log("Voting deployed at:", address(voting));
        console.log("Owner:", voting.owner());

        voting.addCandidate("Alice");
        voting.addCandidate("Bob");

        string[] memory candidates = voting.getAllCandidates();
        for (uint256 i = 0; i < candidates.length; i++) {
            console.log("Candidate:", candidates[i]);
        }

        // Impersonate a voter for the vote call; Script contracts have vm cheatcodes.
        address voter = address(0xB0B);
        vm.prank(voter);
        voting.vote("Alice");

        console.log("Votes for Alice:", voting.getVotes("Alice"));
        console.log("Votes for Bob:", voting.getVotes("Bob"));
    }
}
