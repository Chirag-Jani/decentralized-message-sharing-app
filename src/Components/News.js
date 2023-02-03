import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
// * IMPORTING CONTRACTS
import {
  mainWeb3Contract as MainContract,
  postWeb3Contract as PostNewsContract,
  authWeb3Contract as AuthContract,
  deployedMain,
} from "../../ganache/Contract";

function News(props) {
  const {
    // loggedInUserInfo,
    postInput,
    handlePostInput,
    post,
    oldPosts,
    // getPosts,
    userLoggedIn,
    getCreator,
    cretorInfo,
    reshare,
  } = props;

  // * to use modal

  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ! to get date

  const getPostDate = (time) => {
    let d = new Date(parseInt(time) * 1000).toDateString();
    let t = new Date(parseInt(time) * 1000).toTimeString();
    return (
      <>
        {d} <br /> {t};
      </>
    );
  };

  const [shares, setShares] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const getShares = async (index) => {
    setSelectedIndex(index);
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      const s = await PostNewsContract.methods
        .getShares(index)
        .call({ from: accounts[0], gas: 2000000 });
      setShares(s.sharedBy);
    } catch (error) {
      console.error(error.message);
    }
  };

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
            autoComplete="off"
          />
          <button className="btn btn-primary mx-2 rounded-1" onClick={post}>
            Post
          </button>
          {/* <button onClick={getAllPosts}>getAllPosts</button> */}
        </div>

        <div className="">
          <h2 className="my-3">Previous Posts</h2>
          {/* <button onClick={getPosts} className="btn btn-primary">
            Get Posts
          </button> */}
          {oldPosts
            .slice(0)
            .reverse()
            .map((post, index) => {
              return (
                <>
                  <div
                    className="border border-dark p-3 my-4 text-start"
                    key={index}
                  >
                    <p>
                      <strong> Original Creator: </strong> <br />
                      <p
                        className="text-primary"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Get creator Info"
                        onClick={() => {
                          setShow(true);
                          getCreator(post.postCreator);
                        }}
                      >
                        <u
                          style={{ cursor: "pointer", textDecoration: "none" }}
                        >
                          {post.postCreator}
                        </u>
                      </p>
                    </p>
                    <p>
                      <button
                        className="btn btn-primary my-1 mb-2"
                        onClick={() => {
                          getShares(index);
                        }}
                      >
                        Get Shares
                      </button>
                      <br />
                      {selectedIndex == index ? (
                        shares.map((addr, index) => {
                          return (
                            <p
                              className="text-primary"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Get creator Info"
                              onClick={() => {
                                setShow(true);
                                getCreator(addr);
                              }}
                              key={index}
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                              }}
                            >
                              {index + 1}. {addr}
                            </p>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </p>

                    <p>
                      <strong>Block TimeStamp:</strong>
                      <p>{getPostDate(post.time)}</p>
                    </p>
                    <p>
                      <strong>Block Number:</strong>
                      <p>{post.blockNumber}</p>
                    </p>

                    <p>
                      <strong> Post Content: </strong> <br />
                      {post.postHash}
                    </p>
                    <button
                      className="btn btn-success me-2 rounded-1"
                      onClick={() => {
                        reshare(index);
                      }}
                    >
                      Re-Post
                    </button>
                  </div>
                </>
              );
            })}
        </div>
        {/* This modal will be displayed based on condition */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>The Creator Info!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column my-5">
              <div className="row">
                <div className="col-3 text-end d-flex flex-column">
                  <p>Name:</p>
                  <p>Designation:</p>
                  <p>Department:</p>
                  <p>Address:</p>
                </div>
                <div
                  className="col-9 text-start d-flex flex-column"
                  style={{ marginLeft: "-15px" }}
                >
                  <p>{cretorInfo.name}</p>
                  <p>{cretorInfo.post}</p>
                  <p>{cretorInfo.dept}</p>
                  <p>{cretorInfo.address}</p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  } else {
    return (
      <div className="App container text-center">
        <h1>News you need to know!</h1>
        <div className="">
          {/* <button onClick={getPosts} className="btn btn-primary">
            Get Posts
          </button> */}
          {oldPosts
            .slice(0)
            .reverse()
            .map((post, index) => {
              return (
                <>
                  <div
                    className="border border-dark p-3 my-4 text-start"
                    key={index}
                  >
                    <p>
                      <strong> Original Creator: </strong> <br />
                      <p
                        className="text-primary"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Get creator Info"
                        onClick={() => {
                          setShow(true);
                          getCreator(post.postCreator);
                        }}
                      >
                        <u
                          style={{ cursor: "pointer", textDecoration: "none" }}
                        >
                          {post.postCreator}
                        </u>
                      </p>
                    </p>
                    <p>
                      <button
                        className="btn btn-primary my-1 mb-2"
                        onClick={() => {
                          getShares(index);
                        }}
                      >
                        Get Shares
                      </button>
                      <br />
                      {selectedIndex == index ? (
                        shares.map((addr, index) => {
                          return (
                            <p
                              className="text-primary"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Get creator Info"
                              onClick={() => {
                                setShow(true);
                                getCreator(addr);
                              }}
                              key={index}
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                              }}
                            >
                              {index + 1}. {addr}
                            </p>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </p>
                    <p>
                      <strong>Block TimeStamp:</strong>
                      <p>{getPostDate(post.time)}</p>
                    </p>
                    <p>
                      <strong>Block Number:</strong>
                      <p>{post.blockNumber}</p>
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
        {/* This modal will be displayed based on condition */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>The Creator Info!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column my-5">
              <div className="row">
                <div className="col-3 text-end d-flex flex-column">
                  <p>Name:</p>
                  <p>Designation:</p>
                  <p>Department:</p>
                  <p>Address:</p>
                </div>
                <div
                  className="col-9 text-start d-flex flex-column"
                  style={{ marginLeft: "-15px" }}
                >
                  <p>{cretorInfo.name}</p>
                  <p>{cretorInfo.post}</p>
                  <p>{cretorInfo.dept}</p>
                  <p>{cretorInfo.address}</p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default News;
