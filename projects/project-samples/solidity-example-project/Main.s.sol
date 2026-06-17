// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "./src/Counter.sol";

contract Main is Script {
    function run() external {
        Counter counter = new Counter();
        console.log("Counter deployed at:", address(counter));
        console.log("Initial number:", counter.number());

        counter.increment();
        counter.increment();
        console.log("After two increments:", counter.number());

        counter.decrement();
        console.log("After one decrement:", counter.number());

        counter.setNumber(42);
        console.log("After setNumber(42):", counter.number());
    }
}
