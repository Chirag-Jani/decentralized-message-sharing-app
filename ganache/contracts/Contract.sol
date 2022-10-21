// get msg.sender while posting
// take msg.sender as an argument in all the functions that require input
// connect to metamask while logging in - instead of taking address input manually
// need infura alternative for API and entry point | run locally if not available
// window.eth
// alternative to create webpack 4 - read blogs

// 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
// 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
// 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB
// 0x617F2E2fD72FD9D5503197092aC168c91465E7f2
// 0x17F6AD8Ef982297579C203069C1DbfFE4348c372

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract Contract {
    function recieve() external payable {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // handling news posting here

    struct PostStructure {
        string postHash;
        address postCreator;
        // string[] postViewer;
        bool isRequest;
    }

    PostStructure instanceOfPost;

    PostStructure[] allThePosts;
    mapping(address => PostStructure) postOfUser;

    PostStructure[] allTheRequestedPosts;
    mapping(address => PostStructure) postOfRequestingUser;

    function postNews(
        string memory _postHash,
        address _postCreator,
        bool _isRequest
    ) public {
        // few required require statements
        // user needs to be logged in

        // post viewer needs to be check
        // while mapping through all the posts, check if user exist in the postViewer array or not,
        // for each post, and if it does, render the post else continue

        instanceOfPost.postHash = _postHash;
        instanceOfPost.postCreator = _postCreator;
        // instanceOfPost.postViewer = _postViewer;
        instanceOfPost.isRequest = _isRequest;

        if (_isRequest != true) {
            allThePosts.push(instanceOfPost);
            postOfUser[_postCreator] = instanceOfPost;
        } else {
            allTheRequestedPosts.push(instanceOfPost);
            postOfRequestingUser[_postCreator] = instanceOfPost;
        }
    }

    function getAllPosts(bool requestedPosts)
        public
        view
        returns (PostStructure[] memory)
    {
        if (requestedPosts) {
            return allTheRequestedPosts;
        } else {
            return allThePosts;
        }
    }

    function approvePost(address _requestedBy, address _approvedBy) public {
        // find the post
        PostStructure memory post = postOfRequestingUser[_requestedBy];

        // compare power between requester and approver
        uint256 requestingUserPower = getRequestedMemberWithAddress[
            _requestedBy
        ].power;
        uint256 approvongUserPower = getMemberWithAddress[_approvedBy].power;

        require(
            approvongUserPower < requestingUserPower,
            "You can't approove post of someone above than you."
        );

        // add to the approved list
        allThePosts.push(post);

        // adding to individual user's array
        postOfUser[_requestedBy] = post;

        // remove from the requested list
    }

    function getPostsByUser(address _userAddress)
        public
        view
        returns (PostStructure[] memory)
    {
        return getMemberWithAddress[_userAddress].allPostsByUser;
    }

    // ////////////////////////////////////////////////////////

    // member structure
    struct MemberStruct {
        string post;
        string dept;
        string name;
        address userAddress;
        uint256 power;
        PostStructure[] allPostsByUser;
    }

    // indexes to remove user from request array once approoved
    uint256 requestIndex = 0;
    uint256 memberIndex = 0;

    // to get index of a perticual member by its address
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

    // to get information of member (true = requested member info | false = approoved member info)
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

    // function to add or request member (true = request member | false = directly add member)
    function addOrRequestMember(
        string memory _post,
        string memory _dept,
        string memory _name,
        address _userAddress,
        bool request
    ) public {
        // add some require checks here (REMAINING)

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
        } else if (
            keccak256(abi.encodePacked(_post)) ==
            keccak256(abi.encodePacked("STAFF"))
        ) {
            instanceOfMemberStruct.power = 3;
        } else if (
            keccak256(abi.encodePacked(_post)) ==
            keccak256(abi.encodePacked("STUDENT"))
        ) {
            instanceOfMemberStruct.power = 4;
        } else {
            instanceOfMemberStruct.power = 5;
        }

        // if not dean

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
        }
        // if dean
        else {
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

    // to find member using address (true = find from requested members | false = find from approoved members)
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

    // function to approove request
    function approoveRequest(address _userAddress, address approvingUserAddress)
        public
    {
        MemberStruct memory memberTobeApproved = getRequestedMemberWithAddress[
            _userAddress
        ];
        MemberStruct memory apprivongMember = getMemberWithAddress[
            approvingUserAddress
        ];
        string memory post = memberTobeApproved.post;
        string memory dept = memberTobeApproved.dept;
        string memory name = memberTobeApproved.name;
        address userAddress = memberTobeApproved.userAddress;
        uint256 requestingUserPower = memberTobeApproved.power;
        uint256 approvongUserPower = apprivongMember.power;

        require(
            approvongUserPower <= requestingUserPower,
            "You can't approove someone above than you."
        );

        addOrRequestMember(post, dept, name, userAddress, false);

        // need to remove entry from request array
        removeRequest(_userAddress);
    }

    // function to log in the user (MIGHT NEED SOME require STATEMENTS TO CHECK LATER - RIGHT NOW CAN'T THINK OF ANY)
    function login(address userAddress) public view returns (bool) {
        if ((memberExist[userAddress] == true)) {
            return true;
        } else {
            return false;
        }
    }

    // function to remove requested member from requested array once approoved
    // can use similar to remove post from requested posts as well
    function removeRequest(address _userAddress) internal {
        uint256 index = indexFromRequest[_userAddress];
        arrayOfRequestedMembers[index] = arrayOfRequestedMembers[
            arrayOfRequestedMembers.length - 1
        ];
        arrayOfRequestedMembers.pop();
    }
}
