// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract Contract {
    function recieve() external payable {}

    // post structure
    struct PostStructure {
        address postCreator;
        string postData;
    }

    // member structure
    struct MemberStruct {
        string post;
        string dept;
        string name;
        address userAddress;
        uint256 power;
        PostStructure[] allPostsByUser;
    }

    // instance of post structure, to modify and add new posts
    PostStructure instanceOfPost;

    // to get all the post hashes without having to iterate each member
    PostStructure[] postedByAnyone;

    // function to add post
    function addPost(address _postCreator, string memory _postData) public {
        instanceOfPost.postCreator = _postCreator;
        instanceOfPost.postData = _postData;
        getMemberWithAddress[_postCreator].allPostsByUser.push(instanceOfPost);
        postedByAnyone.push(instanceOfPost);
    }

    // function to get post of an individual member
    function getPostsByUser(address _userAddress)
        public
        view
        returns (PostStructure[] memory)
    {
        return getMemberWithAddress[_userAddress].allPostsByUser;
    }

    // function to get posts by anyone
    function getAllPosts() public view returns (PostStructure[] memory) {
        return postedByAnyone;
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // handling news posting here

    // struct PostStructure{
    //     string postHash;
    //     address postCreator;
    //     // string[] postViewer;
    //     bool isRequest;
    // }

    // PostStructure instanceOfPost;

    // PostStructure[] allThePosts;
    // mapping(address => string) postOfUser;

    // PostStructure[] allTheRequestedPosts;
    // mapping(address => string) postOfRequestingUser;

    // function postNews(string memory _postHash, address _postCreator,  bool _isRequest) public{

    //     // few required require statements
    //     // user needs to be logged in
    //     // user needs to have right to post
    //     // same post should not exist

    //     // while approoving
    //     // check power
    //     // remove from request array

    //     // post viewer needs to be check
    //     // while mapping through all the posts, check if user exist in the postViewer array or not,
    //     // for each post, and if it does, render the post else continue

    //     instanceOfPost.postHash = _postHash;
    //     instanceOfPost.postCreator = _postCreator;
    //     // instanceOfPost.postViewer = _postViewer;
    //     instanceOfPost.isRequest = _isRequest;

    //     if(_isRequest != true){
    //         allThePosts.push(instanceOfPost);
    //         postOfUser[_postCreator] = _postHash;
    //     }
    //     else{
    //         allTheRequestedPosts.push(instanceOfPost);
    //         postOfRequestingUser[_postCreator] = _postHash;
    //     }
    // }

    // function getAllPosts(bool requestedPosts) public view returns(PostStructure[] memory){

    //     if(requestedPosts){
    //         return allTheRequestedPosts;
    //     }
    //     else{
    //         return allThePosts;
    //     }
    // }
}
