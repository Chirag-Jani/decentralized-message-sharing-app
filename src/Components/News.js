import React from "react";

function News(props) {
  const { loggedInUserInfo, postInput, handlePostInput, post, oldPosts } =
    props;

  return (
    <div className="App container text-center">
      <h1>News you need to know!</h1>
      <div className="mt-4 mb-4 d-flex w-25 m-auto align-middle justify-content-center">
        <input
          type="text"
          name="postCreator"
          id=""
          placeholder="Post Creator"
          className="mx-2 rounded-1 text-center"
          value={loggedInUserInfo.userAddress}
          disabled={true}
        />
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
        <h2 className="my-5">Previous Posts</h2>
        {oldPosts.map((post) => {
          return (
            <>
              <div className="my-2 border border-dark border-2 text-start w-25 mx-auto p-3">
                <p>Posted by: {post.postCreatedBy}</p>
                <p>{post.postInfo}</p>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default News;
