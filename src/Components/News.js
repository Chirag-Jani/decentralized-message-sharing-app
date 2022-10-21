import React from "react";

function News(props) {
  const {
    loggedInUserInfo,
    postInput,
    handlePostInput,
    post,
    oldPosts,
    getPosts,
    userLoggedIn,
  } = props;

  if (userLoggedIn) {
    return (
      <div className="App container text-center">
        <h1>News you need to know!</h1>
        <div className="mt-4 mb-4 d-flex w-25 m-auto align-middle justify-content-center">
          {/* here we are taking user's address while posting or requesting */}
          {/* <input
            type="text"
            name="postCreator"
            id=""
            placeholder="Post Creator"
            className="mx-2 rounded-1 text-center"
            value={loggedInUserInfo.userAddress}
            disabled={true}
          /> */}
          <input
            type="text"
            name="postInput"
            id=""
            placeholder="Post Data"
            className="mx-2 rounded-1 text-center"
            value={postInput}
            onChange={handlePostInput}
          />
          <button className="btn btn-primary mx-2 rounded-1" onClick={post}>
            Post
          </button>
          {/* <button onClick={getAllPosts}>getAllPosts</button> */}
        </div>

        <div className="">
          <h2 className="my-3">Previous Posts</h2>
          <button onClick={getPosts} className="btn btn-primary">
            Get Posts
          </button>
          {oldPosts.map((post) => {
            return (
              <>
                <div className="border border-dark p-3 my-4 text-start">
                  <p>
                    <strong> Posted by: </strong> <br />
                    {post.postCreator}
                  </p>
                  <p>
                    <strong> Post Content: </strong> <br />
                    {post.postHash}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="App container text-center">
        <h1>News you need to know!</h1>

        <div className="">
          <button onClick={getPosts} className="btn btn-primary">
            Get Posts
          </button>
          {oldPosts.map((post) => {
            return (
              <>
                <div className="border border-dark p-3 my-4 text-start">
                  <p>
                    <strong> Posted by: </strong> <br />
                    {post.postCreator}
                  </p>
                  <p>
                    <strong> Post Content: </strong> <br />
                    {post.postHash}
                  </p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
