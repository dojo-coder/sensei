// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Voting {
    address public owner;
    mapping(string => uint256) public votes;
    mapping(address => bool) public hasVoted;
    string[] public candidates;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action.");
        _;
    }

    modifier candidateExists(string memory _candidate) {}

    constructor() {
        owner = msg.sender;  // Set the contract deployer as the owner
    }

    function addCandidate(string memory _name) public onlyOwner {
    }

    function getAllCandidates() public view returns (string[] memory) {
    }

    function getVotes(string memory _candidate) public view returns (uint256) {
    }

    // TODO: Implement voting function
    // TODO: Implement check for duplicate voting
    function vote(string memory _candidate) public candidateExists(_candidate) {
    }
}
