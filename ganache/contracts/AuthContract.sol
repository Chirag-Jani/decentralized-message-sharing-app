// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;
import "hardhat/console.sol";

interface MainContractInterface {
    function memberExistOrNot(address) external payable returns (bool);
}

interface PostNewsContractInterface {
    struct PostStructure {
        string postHash;
        address postCreator;
        // string[] postViewer;
        bool isRequest;
    }
}

contract AuthContract {
    // logged in user struct

    // struct LoggedInUser{
    //     address userAddress;
    //     string userName;
    //     string userDept;
    //     string userPost;
    //     uint256 userPower;
    //     PostNewsContractInterface.PostStructure[] allPostsByUser;
    // }

    // function to log in the user (MIGHT NEED SOME require STATEMENTS TO CHECK LATER - RIGHT NOW CAN'T THINK OF ANY)
    function login(address userAddress, address mainContractAddress)
        public
        returns (bool)
    {
        // working fine
        bool loggedInOrNot = MainContractInterface(mainContractAddress)
            .memberExistOrNot(userAddress);
        return loggedInOrNot;
    }

    // logout function
}
