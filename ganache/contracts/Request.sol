// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

// interface to call already deployed UsersContract
interface UsersContractInterface {
    // to call userExist function - user address as an argument
    function userExistFunc(address user) external payable returns (bool);

    // sign up function - user address as an argument
    function signUp(address user, address _MemberContract) external payable;
}

interface MemberContractInterface {
    // get the checker function
    function checkPower(address approvingMember, address requestingMember)
        external
        view
        returns (bool ans);
}

contract Request {
    mapping(address => bool) requests;
    address[] requestArray;
    mapping(address => bool) discardedUsers;
    address[] discardedRequests;
    address[] approvedRequests;

    function recieve() external payable {}

    // function to get all the requests - as of now we will use requestArray
    function getRequests() public view returns (address[] memory) {
        return requestArray;
    }

    // this functin will be called by Users contract only to add requests
    function addRequest(address newUser, address _UserContract)
        external
        payable
    {
        // if user is discarded then it can not send request again
        // require(discardedUsers[newUser] == true, "Your Request is discarded");

        // we can call userExist function from users contract to save mapping space in this contract
        // require(UsersContractInterface(_UserContract).userExistFunc(newUser), "User already exist");

        // checking if request is already there
        require(requests[newUser] == false, "You have already requested");

        // adding new request
        requests[newUser] = true;
        requestArray.push(newUser);
    }

    function appreveRequest(
        address requestingMember,
        address _UserContract,
        address _MemberContract,
        address approvingMember
    ) public payable {
        //  user have to request first from the requestSignup function
        require(
            requests[requestingMember] == true,
            "You have to send request from Member contract"
        );

        // we can call userExist function from users contract to save mapping space in this contract
        // this require is giving error
        // require(UsersContractInterface(_UserContract).userExistFunc(user), "User already exist");

        // check for powers of both users
        bool powerComparision = MemberContractInterface(_MemberContract)
            .checkPower(approvingMember, requestingMember);
        require(
            powerComparision == true,
            "You DO NOT have permission to approve other members"
        );

        // call sign up function from users contract
        UsersContractInterface(_UserContract).signUp(
            requestingMember,
            _MemberContract
        );

        // add this one to approved request
        approvedRequests.push(requestingMember);
    }

    function discardRequest(address user) external returns (string memory) {
        // add this to discarded users
        discardedUsers[user] = true;
        discardedRequests.push(user);
        return "Your request has been Discarded";
    }

    // function to remove request from the requests array
    // not implemented right now - working fine
    // function removeRequest(uint index) public{
    //     require(index <= requestArray.length - 1, "Index out of bound");
    //     for (uint i = index; i<requestArray.length-1; i++){
    //         requestArray[i] = requestArray[i+1];
    //     }
    //     requestArray.pop();
    // }
}
