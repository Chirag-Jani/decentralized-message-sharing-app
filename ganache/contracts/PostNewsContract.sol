// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract PostNewsContract {
    struct PostStructure {
        string postHash;
        address postCreator;
        // string[] postViewer;
        bool isRequest;
    }

    // setting instance of the post structure
    PostStructure instanceOfPost;

    // array to store all the approved posts
    PostStructure[] allThePosts;

    // mapping to get each post of individual user
    mapping(address => PostStructure[]) postOfUser;

    // array to store all the requested posts
    PostStructure[] allTheRequestedPosts;

    // mapping to get each post request of individual user
    mapping(address => PostStructure[]) postOfRequestingUser; // this mapping will always return the same post and that's why we're getting error

    // we are using these mappings to approve posts

    // to get post from index
    mapping(uint256 => PostStructure) postFromIdx;

    // indexes to remove user from request array once approoved
    uint256 requestPostIndex = 0;
    uint256 approvedPostIndex = 0;

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

        // if not request - add directly
        if (_isRequest != true) {
            // adding post to all the approved posts
            allThePosts.push(instanceOfPost);

            // adding post to individual user's array of posts and mapping
            postOfUser[_postCreator].push(instanceOfPost);

            // to set the index of the post
            postFromIdx[approvedPostIndex] = instanceOfPost;

            // incrementing index count for the next post
            approvedPostIndex++;
        }
        // if request - add to requested first
        else {
            // adding post to all the requested posts
            allTheRequestedPosts.push(instanceOfPost);

            // adding post to individual user's array of requested posts and mapping
            postOfRequestingUser[_postCreator].push(instanceOfPost);

            // to set the index of the requested post
            postFromIdx[requestPostIndex] = instanceOfPost;

            // incrementing index for the next post request
            requestPostIndex++;
        }
    }

    // getting all the posts
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

    function approvePost(uint256 postIdx) public {
        // find the post
        PostStructure memory post = allTheRequestedPosts[postIdx];

        //converting requested to approved
        post.isRequest = false;

        // add to the approved list
        allThePosts.push(post);
        approvedPostIndex++;

        // adding to individual user's array
        postOfUser[post.postCreator].push(post);

        // removing from the requested list
        allTheRequestedPosts[postIdx] = allTheRequestedPosts[
            allTheRequestedPosts.length - 1
        ];
        allTheRequestedPosts.pop();
    }

    function getPostsByUser(address _userAddress)
        public
        view
        returns (PostStructure[] memory)
    {
        return postOfUser[_userAddress];
    }
}
