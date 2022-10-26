import React from "react";
import { Link } from "react-router-dom";

function Profile(props) {
  const {
    userLoggedIn,
    // getMethods,
    getRequestedMember,
    getApprovedMember,
    requestedMembersArray,
    approovedMembersArray,
    loggedInUserInfo,
    approoveMember,
    showApproovedMemberInfo,
    showRequestedMemberInfo,
    getRequestedPosts,
    requestedPosts,
    approvePost,
  } = props;

  if (userLoggedIn) {
    if (showApproovedMemberInfo) {
      return (
        <div className="container-fluid d-flex flex-column">
          <h2 className="text-center">Your Profile</h2>
          <div className="d-flex flex-column my-5">
            <div className="row">
              <div className="col-4 text-end d-flex flex-column">
                <strong>Name:</strong>
                <strong>Post:</strong>
                <strong>Department:</strong>
                <strong>Address:</strong>
              </div>
              <div className="col-8 text-start d-flex flex-column">
                <strong>{loggedInUserInfo.name}</strong>
                <strong>{loggedInUserInfo.post}</strong>
                <strong>{loggedInUserInfo.dept}</strong>
                <strong>{loggedInUserInfo.userAddress}</strong>
              </div>
            </div>
          </div>
          <div className="w-100 d-flex justify-content-evenly">
            {/* <button className="my-2 btn btn-primary mx-1" onClick={getMethods}>
              Get Available Methods
            </button> */}
            <button
              className="my-2 btn btn-primary mx-1"
              onClick={getRequestedMember}
            >
              Get Requested Members
            </button>
            <button
              className="my-2 btn btn-primary mx-1"
              onClick={getApprovedMember}
            >
              Get Members
            </button>
            <button
              className="my-2 btn btn-primary mx-1"
              onClick={getRequestedPosts}
            >
              Get Requested Posts
            </button>
          </div>

          <div className="container">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Post</th>
                  <th>Department</th>
                  <th>Address</th>
                  <th>Power</th>
                  {/* <th>Remove</th> */}
                  {/* <th>Approove</th> */}
                </tr>
              </thead>

              {
                <tbody>
                  {approovedMembersArray.map((member, index) => {
                    return (
                      <>
                        <tr>
                          <th>{index}</th>
                          <td>{member.name}</td>
                          <td>{member.post}</td>
                          <td>{member.dept}</td>
                          <td>{member.userAddress}</td>
                          <td>{member.power}</td>
                          {/* <td>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash3"
                              viewBox="0 0 16 16"
                              onClick={() => {
                                console.log("Write function to remove Member.");
                              }}
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>
                          </td> */}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              }
            </table>
          </div>
        </div>
      );
    } else if (showRequestedMemberInfo) {
      return (
        <div className="container-fluid d-flex flex-column">
          <h2 className="text-center">Your Profile</h2>
          <div className="d-flex flex-column my-5">
            <div className="row">
              <div className="col-4 text-end d-flex flex-column">
                <strong>Name:</strong>
                <strong>Post:</strong>
                <strong>Department:</strong>
                <strong>Address:</strong>
              </div>
              <div className="col-8 text-start d-flex flex-column">
                <strong>{loggedInUserInfo.name}</strong>
                <strong>{loggedInUserInfo.post}</strong>
                <strong>{loggedInUserInfo.dept}</strong>
                <strong>{loggedInUserInfo.userAddress}</strong>
              </div>
            </div>
          </div>
          <div className="w-100 d-flex justify-content-evenly">
            {/* <button className="my-2 btn btn-primary mx-1" onClick={getMethods}>
              Get Available Methods
            </button> */}
            <button
              className="my-2 btn btn-primary mx-1"
              onClick={getRequestedMember}
            >
              Get Requested Members
            </button>
            <button
              className="my-2 btn btn-primary mx-1"
              onClick={getApprovedMember}
            >
              Get Members
            </button>
            <button
              className="my-2 btn btn-primary mx-1"
              onClick={getRequestedPosts}
            >
              Get Requested Posts
            </button>
          </div>

          <div className="container">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Post</th>
                  <th>Department</th>
                  <th>Address</th>
                  <th>Power</th>
                  {/* <th>Remove</th> */}
                  <th>Approove</th>
                </tr>
              </thead>
              {
                <tbody>
                  {requestedMembersArray.map((member, index) => {
                    return (
                      <>
                        <tr>
                          <th>{index}</th>
                          <td>{member.name}</td>
                          <td>{member.post}</td>
                          <td>{member.dept}</td>
                          <td>{member.userAddress}</td>
                          <td>{member.power}</td>
                          {/* <td>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash3"
                              viewBox="0 0 16 16"
                              onClick={() => {
                                console.log("Write function to remove Member.");
                              }}
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>
                          </td> */}
                          <td>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-check-circle"
                              viewBox="0 0 16 16"
                              onClick={() => {
                                approoveMember(member.userAddress);
                              }}
                            >
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                            </svg>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              }{" "}
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid d-flex flex-column">
          <h2 className="text-center">Your Profile</h2>
          <div className="d-flex flex-column my-5">
            <div className="row">
              <div className="col-4 text-end d-flex flex-column">
                <strong>Name:</strong>
                <strong>Post:</strong>
                <strong>Department:</strong>
                <strong>Address:</strong>
              </div>
              <div className="col-8 text-start d-flex flex-column">
                <strong>{loggedInUserInfo.name}</strong>
                <strong>{loggedInUserInfo.post}</strong>
                <strong>{loggedInUserInfo.dept}</strong>
                <strong>{loggedInUserInfo.userAddress}</strong>
              </div>
            </div>
          </div>
          <div className="w-100 d-flex justify-content-evenly">
            {/* <button className="my-2 btn btn-primary mx-1" onClick={getMethods}>
              Get Available Methods
            </button> */}
            <button
              className="my-2 btn btn-primary mx-1"
              onClick={getRequestedMember}
            >
              Get Requested Members
            </button>
            <button
              className="my-2 btn btn-primary mx-1"
              onClick={getApprovedMember}
            >
              Get Members
            </button>
            <button
              className="my-2 btn btn-primary mx-1"
              onClick={getRequestedPosts}
            >
              Get Requested Posts
            </button>
          </div>

          <div className="container">
            {requestedPosts.map((post, idx) => {
              if (post.isRequest) {
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
                      <button
                        className="btn btn-success my-1"
                        onClick={() => {
                          approvePost(idx);
                        }}
                      >
                        Approve
                      </button>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="container">
        <h3>
          <Link to="/login">Log in</Link> to access this feature.
        </h3>
      </div>
    );
  }
}

export default Profile;
