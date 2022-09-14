// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.6;

contract TestContract {
    uint256 x = 234;
    string name = "Jani Chirag";

    function getName() public pure returns (string memory name) {
        return name;
    }

    function getX() public view returns (uint256 xvalue) {
        return x;
    }

    function setX(uint256 _x) public {
        x = _x;
    }
}
