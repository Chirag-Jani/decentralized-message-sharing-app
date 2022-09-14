// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

interface RequestContractInterface {
    // to call addRequest function - user address as an argument
    function addRequest(address user, address _contract) external payable;
}

interface MemberContractInterface {
    // get our addMember function
    function preAddMember(address userAddress) external payable;
}

contract UsersContract {
    // array consisting current users' addresses
    address[] currUsers;

    // mapping that keeps track of signed up users
    mapping(address => bool) userExist;

    function recieve() external payable {}

    // this will return all the current users
    function getUsers() public view returns (address[] memory) {
        return currUsers;
    }

    // check if user is already there - this is giving error everywhere - recheck this one
    function userExistFunc(address user) public payable returns (bool ans) {
        if (userExist[user]==true) return true;
        else return false;
    }

    // pre sign up function - it will send request to get approved and then it will sign up the user
    function requestSignUp(address newUser, address _contract) public payable {
        // modify the request array here - call addRequest function with newUser as an argument
        RequestContractInterface(_contract).addRequest(newUser, _contract);
    }

    // function to add address in our array - approve signup
    function signUp(address newUser, address _MemberContract) external payable {
        // check if user has requested or not

        // checking if user already exist or not
        if (!userExistFunc(newUser)) {
            // adding user into our array
            currUsers.push(newUser);

            // marking user as signed up in mapping
            userExist[newUser] = true;

            // we have to call preAddMember function from our Member contract to add member in our structure
            MemberContractInterface(_MemberContract).preAddMember(newUser);
        }

    }

    // function to login user - not needed as of now
    function login(address signInAddress) public view returns (bool) {
        // checking if user is signed up
        if (userExist[signInAddress]) {
            return true;
        } else {
            return false;
        }
    }
}

// 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
// 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
// 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB
// 0x617F2E2fD72FD9D5503197092aC168c91465E7f2
