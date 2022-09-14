// SPDX-License-Identifier: GPL-3.0
// approve/discard will need modification as we have to go by the precedence
// approve/discard will take two addresses as arguments (1st who is approving, 2nd who needs to get approved)
// and we can check with those addresses about precedence in our AcceptedMember struct and compare the precedence

// create the array of structs and then store the structs in it directly
// it will make storing, mapping user, and retrival easy

pragma solidity ^0.8.7;

interface UsersContractInterface {
    // get requestSignup function
    function requestSignUp(address newUser, address _Requestcontract)
        external
        payable;
}

contract MemberContract {
    function recieve() external payable {}

    // Approved member struct
    struct Member {
        string[] post;
        string[] dept;
        string[] name;
        address[] userAddress;
        uint256[] power;
    }

    // discarded member struct, two mappings, one index, and an Instance

    // //////////////////////////////////////////////////////////////////////////////////////////////////

    // requested member struct, two mappings, one index, and an Instance
    struct RequestedMember {
        string[] post;
        string[] dept;
        string[] name;
        address[] userAddress;
        uint256[] power;
    }

    mapping(address => RequestedMember) memberRequestPointer;

    mapping(address => bool) memberRequestExist;

    mapping(address => uint256) memberRequestIndex;

    uint256 iRequest = 0;

    // instance of memmber struct to store it
    RequestedMember newMemberRequest;

    // function to request member
    function requestMember(
        string memory _post,
        string memory _dept,
        string memory _name,
        address _userAddress,
        address _Requestcontract,
        address _UserContract
    ) public payable {
        // check if there exist a member with the same address - then deny the request
        require(
            memberRequestExist[_userAddress] == false,
            "Member alredy requested"
        );

        // adds member in our requestedMember struct
        newMemberRequest.post.push(_post);
        newMemberRequest.dept.push(_dept);
        newMemberRequest.name.push(_name);
        newMemberRequest.userAddress.push(_userAddress);

        if (
            keccak256(abi.encodePacked(_post)) ==
            keccak256(abi.encodePacked("DEAN"))
        ) {
            newMemberRequest.power.push(0);
        } else if (
            keccak256(abi.encodePacked(_post)) ==
            keccak256(abi.encodePacked("HOD"))
        ) {
            newMemberRequest.power.push(1);
        } else {
            newMemberRequest.power.push(2);
        }

        // storing index of member's request
        memberRequestIndex[_userAddress] = iRequest;

        // marking the member as requested - so anyone with same address can not request twice
        memberRequestExist[_userAddress] = true;

        // add member to memberRequestPointer - we can find member's request purely based on it's address
        memberRequestPointer[_userAddress] = newMemberRequest;

        // incrementing index for next user
        iRequest++;

        // calls requestSignup function with _userAddress as an argument
        UsersContractInterface(_UserContract).requestSignUp(
            _userAddress,
            _Requestcontract
        );
    }

    // function that returns all the members
    function getEveryRequestedMember()
        public
        view
        returns (
            string[] memory post,
            string[] memory dept,
            string[] memory name,
            uint256[] memory power,
            address[] memory userAddress
        )
    {
        return (
            newMemberRequest.post,
            newMemberRequest.dept,
            newMemberRequest.name,
            newMemberRequest.power,
            newMemberRequest.userAddress
        );
    }

    // function to find user - login user
    // function findRequestedMember(address _userAddress)  public view returns(string memory post, string memory dept, string memory name, uint  power, address  userAddress){

    //     // see if member exist or not
    //     require (memberExist[_userAddress] == true, "User does not exist");

    //     // getting the index of the requested memner
    //     uint idx = memberIndex[_userAddress];

    //     // returns the member at the given index without any iteration
    //     return (newMember.post[idx], newMember.dept[idx], newMember.name[idx], newMember.power[idx], newMember.userAddress[idx]);
    // }

    // /////////////////////////////////////////

    // mapping to store member's struct with it's address
    mapping(address => Member) memberPointer;

    // this mapping is to check if member is there or not (to avoid iteration)
    mapping(address => bool) memberExist;

    // mapping to store member's index
    mapping(address => uint256) memberIndex;

    uint256 i = 0;

    // instance of memmber struct to store it
    Member newMember;

    // pre add member - this will call addMember - we have to write this one because in userContract we don't have member details and we need them to add user in our struct
    function preAddMember(address _userAddress) public payable {
        uint256 idx = memberRequestIndex[_userAddress];
        string memory post = newMemberRequest.post[idx];
        string memory dept = newMemberRequest.dept[idx];
        string memory name = newMemberRequest.name[idx];
        address userAddress = newMemberRequest.userAddress[idx];

        addMember(post, dept, name, userAddress);
    }

    // function to add members in our struct
    function addMember(
        string memory _post,
        string memory _dept,
        string memory _name,
        address _userAddress
    ) public {
        // check if there exist a member with the same address - then deny the request
        require(memberExist[_userAddress] == false, "Member alredy Exist");

        // adds member in our structure
        newMember.post.push(_post);
        newMember.dept.push(_dept);
        newMember.name.push(_name);
        newMember.userAddress.push(_userAddress);

        if (
            keccak256(abi.encodePacked(_post)) ==
            keccak256(abi.encodePacked("DEAN"))
        ) {
            newMember.power.push(0);
        } else if (
            keccak256(abi.encodePacked(_post)) ==
            keccak256(abi.encodePacked("HOD"))
        ) {
            newMember.power.push(1);
        } else {
            newMember.power.push(2);
        }

        // storing index of user
        memberIndex[_userAddress] = i;

        // marking the member as true - so anyone with same address can not enter twice
        memberExist[_userAddress] = true;

        // add member to memberPointer - we can find member purely based on it's address
        memberPointer[_userAddress] = newMember;

        // incrementing index for next user
        i++;
    }

    // function that returns all the members
    function getEveryMember()
        public
        view
        returns (
            string[] memory post,
            string[] memory dept,
            string[] memory name,
            uint256[] memory power,
            address[] memory userAddress
        )
    {
        return (
            newMember.post,
            newMember.dept,
            newMember.name,
            newMember.power,
            newMember.userAddress
        );
    }

    // function to find user - login user
    function findMember(address _userAddress)
        public
        view
        returns (
            string memory post,
            string memory dept,
            string memory name,
            uint256 power,
            address userAddress
        )
    {
        // see if member exist or not
        require(memberExist[_userAddress] == true, "User does not exist");

        // getting the index of the requested memner
        uint256 idx = memberIndex[_userAddress];

        // returns the member at the given index without any iteration
        return (
            newMember.post[idx],
            newMember.dept[idx],
            newMember.name[idx],
            newMember.power[idx],
            newMember.userAddress[idx]
        );
    }

    // find power - existing
    function findPower(address _userAddress)
        public
        view
        returns (uint256 power)
    {
        require(memberExist[_userAddress] == true, "User does not exist");
        uint256 idx = memberIndex[_userAddress];
        return newMember.power[idx];
    }

    // find power - requesting
    function findReqPower(address _userAddress)
        public
        view
        returns (uint256 power)
    {
        require(
            memberRequestExist[_userAddress] == true,
            "User does not exist"
        );
        uint256 idx = memberRequestIndex[_userAddress];
        return newMemberRequest.power[idx];
    }

    // function to compare powers
    function checkPower(address approvingMember, address requestingMember)
        external
        view
        returns (bool ans)
    {
        if (
            keccak256(
                abi.encodePacked(
                    memberRequestPointer[approvingMember].post[
                        memberRequestIndex[requestingMember]
                    ]
                )
            ) != keccak256(abi.encodePacked("DEAN"))
        ) {
            // a few require statements will come here to check validity of approval

            // the one who is approving should already be a member
            require(
                memberExist[approvingMember] == true,
                "You must be a member to approve others"
            );

            // comparing powers of both users - NOT ABLE TO GET POWERS PROPERLY

            // getting the index of the requested member - error getting generated over here
            // uint idxApp = findPower(approvingMember);
            // uint idxReq = findReqPower(requestingMember);

            // if(idxApp > idxReq){
            //     return true;
            // }
            // else {
            //     return false;
            // }

            // require(findPower(approvingMember) >= findReqPower(requestingMember), "NAI BHAI");
            return true;
        }

        return true;
    }
}
