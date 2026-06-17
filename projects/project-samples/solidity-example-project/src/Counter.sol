// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

contract Counter {
    uint256 public number;

    event NumberChanged(uint256 newNumber);

    function increment() public {
        number += 1;
        emit NumberChanged(number);
    }

    function decrement() public {
        require(number > 0, "Counter: cannot decrement below zero");
        number -= 1;
        emit NumberChanged(number);
    }

    function setNumber(uint256 _number) public {
        number = _number;
        emit NumberChanged(number);
    }
}
