// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract Contract {
    function recieve() external payable {}

    struct MemberStruct {
        string post;
        string dept;
        string name;
        address userAddress;
        uint256 power;
        string[] postedNews;
    }

    // indexes to remove

    uint256 requestIndex = 0;
    uint256 memberIndex = 0;

    mapping(address => uint256) indexFromRequest;
    mapping(address => uint256) indexFromApproove;

    // for approved members
    mapping(address => MemberStruct) getMemberWithAddress;
    MemberStruct[] arrayOfMembers;
    mapping(address => bool) memberExist;

    // for requested members
    mapping(address => MemberStruct) getRequestedMemberWithAddress;
    MemberStruct[] arrayOfRequestedMembers;
    mapping(address => bool) memberRequested;

    function getApprovedOrRequestedMember(bool request)
        public
        view
        returns (MemberStruct[] memory)
    {
        if (request == true) {
            return arrayOfRequestedMembers;
        } else {
            return arrayOfMembers;
        }
    }

    // instance of the struct to use everywhere
    MemberStruct instanceOfMemberStruct;

    function addOrRequestMember(
        string memory _post,
        string memory _dept,
        string memory _name,
        address _userAddress,
        bool request
    ) public {
        // add some require checks here

        instanceOfMemberStruct.post = _post;
        instanceOfMemberStruct.dept = _dept;
        instanceOfMemberStruct.name = _name;
        instanceOfMemberStruct.userAddress = _userAddress;

        if (
            keccak256(abi.encodePacked(_post)) ==
            keccak256(abi.encodePacked("DEAN"))
        ) {
            instanceOfMemberStruct.power = 1;
        } else if (
            keccak256(abi.encodePacked(_post)) ==
            keccak256(abi.encodePacked("HOD"))
        ) {
            instanceOfMemberStruct.power = 2;
        } else {
            instanceOfMemberStruct.power = 3;
        }

        if (
            request == true &&
            keccak256(abi.encodePacked(_post)) !=
            keccak256(abi.encodePacked("DEAN"))
        ) {
            // some require checks here
            require(memberRequested[_userAddress] == false, "Member Requested");
            require(memberExist[_userAddress] == false, "Member Exist");

            // add it to the requested member data structure
            arrayOfRequestedMembers.push(instanceOfMemberStruct);
            getRequestedMemberWithAddress[
                _userAddress
            ] = instanceOfMemberStruct;
            memberRequested[_userAddress] = true;
        } else {
            if (
                keccak256(abi.encodePacked(_post)) !=
                keccak256(abi.encodePacked("DEAN"))
            ) {
                // some require checks here
                require(
                    memberRequested[_userAddress] == true,
                    "You need to Request First"
                );
            }

            require(memberExist[_userAddress] == false, "Member Exist");

            // add it to the approved member data structure
            arrayOfMembers.push(instanceOfMemberStruct);
            getMemberWithAddress[_userAddress] = instanceOfMemberStruct;
            memberExist[_userAddress] = true;
        }
    }

    function findMember(address _userAddress, bool requestedMember)
        public
        view
        returns (MemberStruct memory)
    {
        if (requestedMember == true) {
            return getRequestedMemberWithAddress[_userAddress];
        } else {
            return getMemberWithAddress[_userAddress];
        }
    }

    function approoveRequest(address _userAddress, address approvingUserAddress)
        public
    {
        MemberStruct memory memberTobeApproved = getRequestedMemberWithAddress[
            _userAddress
        ];
        MemberStruct memory apprivingMember = getMemberWithAddress[
            approvingUserAddress
        ];
        string memory post = memberTobeApproved.post;
        string memory dept = memberTobeApproved.dept;
        string memory name = memberTobeApproved.name;
        address userAddress = memberTobeApproved.userAddress;
        uint256 requestingUserPower = memberTobeApproved.power;
        uint256 approvingUserPower = apprivingMember.power;

        require(
            approvingUserPower <= requestingUserPower,
            "You can't approove someone above than you."
        );

        addOrRequestMember(post, dept, name, userAddress, false);

        // need to remove entry from request array
        removeRequest(_userAddress);
    }

    function login(address userAddress) public view returns (bool) {
        if ((memberExist[userAddress] == true)) {
            return true;
        } else {
            return false;
        }
    }

    function removeRequest(address _userAddress) internal {
        uint256 index = indexFromRequest[_userAddress];
        arrayOfRequestedMembers[index] = arrayOfRequestedMembers[
            arrayOfRequestedMembers.length - 1
        ];
        arrayOfRequestedMembers.pop();
    }
}
