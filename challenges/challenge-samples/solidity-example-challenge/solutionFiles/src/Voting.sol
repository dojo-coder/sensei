// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Voting {
    address public owner;
    mapping(string => uint256) public votes;
    mapping(address => bool) public hasVoted;
    string[] public candidates;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier candidateExists(string memory _candidate) {
        bool exists = false;
        for (uint i = 0; i < candidates.length; i++) {
            if (keccak256(abi.encodePacked(candidates[i])) == keccak256(abi.encodePacked(_candidate))) {
                exists = true;
                break;
            }
        }
        require(exists, "Candidate does not exist");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(_name);
        votes[_name] = 0;
    }

    function vote(string memory _candidate) public candidateExists(_candidate) {
        require(!hasVoted[msg.sender], "You have already voted");
        votes[_candidate]++;
        hasVoted[msg.sender] = true;
    }

    function getVotes(string memory _candidate) public view candidateExists(_candidate) returns (uint256) {
        return votes[_candidate];
    }

    function getAllCandidates() public view returns (string[] memory) {
        return candidates;
    }
}
