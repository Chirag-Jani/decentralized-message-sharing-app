// 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
// 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
// 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB
// 0x617F2E2fD72FD9D5503197092aC168c91465E7f2
// 0x17F6AD8Ef982297579C203069C1DbfFE4348c372

//? currnet issues:
// * getting logged out on refresh

// * IMPORTING DEPENDENCIES
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// * IMPORTING COMPONENTS
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import News from "./Components/News";
import Profile from "./Components/Profile";

// * IMPORTING CONTRACTS
import {
  mainWeb3Contract as MainContract,
  postWeb3Contract as PostNewsContract,
  authWeb3Contract as AuthContract,
  deployedMain,
} from "../ganache/Contract";

// // * nft storage imports
// import { NFTStorage, File, Blob } from "nft.storage";

// // !
// const NFT_STORAGE_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQwQjI4NTc2QjI2NThiNTJBOUJjQ2Y5MzRGNDg1MDkxOUEwNzlEMkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NDk4OTI1ODcyMSwibmFtZSI6IkRNQXBwIn0.hZKkmeCVfTz-NdN4-QYqqNe06CTYCrM_Pp3OtvucsfA";
// const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

function App() {
  //
  const [cretorInfo, setCretorInfo] = useState({
    name: "",
    address: "",
    post: "",
    dept: "",
  });
  const getCreator = async (creatorAddress) => {
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      const findMember = await MainContract.methods
        .findMember(creatorAddress, false)
        .call({ from: accounts[0], gas: 2000000 });

      // const [name, post, dept, userAddress] = findmember;

      setCretorInfo({
        name: findMember.name,
        address: findMember.userAddress,
        post: findMember.post,
        dept: findMember.dept,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // ! REQUESTING AND APPROVAL OF MEMBER FUNCTIONALITIES AND IT'S STATES

  // * STATE TO HANDLE WHICH MEMBERS TO DISPLAY IN PROFILE COMPONENT
  const [showApproovedMemberInfo, setShowApproovedMemberInfo] = useState(false);
  const [showRequestedMemberInfo, setShowRequestedMemberInfo] = useState(false);

  // * STATE OF REQUESTED MEMBERS
  const [requestedMembersArray, setRequestedMembersArray] = useState([]);

  // * STATE OF APPROVED MEMBERS
  const [approovedMembersArray, setApproovedMembersArray] = useState([]);

  // * STATE OF INPUTS WHILE REGISTRATION/REQUESTING MEMBER
  const [memberInfo, setMemberInfo] = useState({
    post: "",
    dept: "",
    name: "",
    userAddress: "",
  });

  // * HANDLER FUNCTION WHILE REGISTRATION
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name != "userAddress") {
      let capitalizedValue = value.toUpperCase();
      setMemberInfo({
        ...memberInfo,
        [name]: capitalizedValue,
      });
    } else {
      setMemberInfo({
        ...memberInfo,
        [name]: value,
      });
    }
  };

  // * GETTING REQUESTED MEMBERS TO DISPLAY IN PROFILE COMPONENT
  const getRequestedMember = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      const requestedMembers = await MainContract.methods
        .getApprovedOrRequestedMember(true)
        .call({ from: accounts[0], gas: 2000000 });
      setRequestedMembersArray(requestedMembers);
      setShowApproovedMemberInfo(false);
      setShowRequestedMemberInfo(true);
    } catch (error) {
      console.error(error);
    }
  };

  // * GETTING APPROVED MEMBERS TO DISPLAY IN PROFILE COMPONENT
  const getApprovedMember = async () => {
    try {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      const approvedMembers = await MainContract.methods
        .getApprovedOrRequestedMember(false)
        .call({ from: accounts[0], gas: 2000000 });

      setApproovedMembersArray(approvedMembers);
      setShowApproovedMemberInfo(true);
      setShowRequestedMemberInfo(false);
    } catch (error) {
      console.error(error);
    }
  };

  // * REQUESTING MEMBER
  const requestMember = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      const requestMember = await MainContract.methods
        .addOrRequestMember(
          memberInfo.post,
          memberInfo.dept,
          memberInfo.name,
          memberInfo.userAddress,
          true
        )
        .send({ from: accounts[0], gas: 2000000 });

      setMemberInfo({ post: "", dept: "", name: "", userAddress: "" });
      alert("Request Successful!");
    } catch (err) {
      console.error(err.message);
    }
  };

  // * APPROVING MEMBER
  const approoveMember = async (userAddress) => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      const approove = await MainContract.methods
        .approoveRequest(userAddress, loggedInUserInfo.userAddress)
        .send({ from: accounts[0], gas: 2000000 });

      alert("Member Approoved!");

      // if user is now allowed to approve user (because they are at higher position), then alert the user when the require statement is reverting the contract
      // if (!approove) {
      //   alert("na bhai");
      // }
    } catch (err) {
      console.error(err.message);
      alert("Approval Interrupted!");
    }
  };

  // ! LOGIN - LOGOUT FUNCTIONALITIES AND IT'S STATES

  // * STATE TO CHECK IF USER IS LOGGED IN OR NOT
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // * STATE TO MANAGE LOGGED IN USER'S DETAILS
  const [loggedInUserInfo, setLoggedInUserInfo] = useState({
    post: "",
    dept: "",
    name: "",
    userAddress: "",
  });

  // * STATE TO MANAGE USER INPUT WHILE LOGIN - LATER IT WILL BE REMOVED AS WE WILL USE METAMASK TO LOGIN DIRECTLY
  const [loginUserAddress, setLoginUserAddress] = useState("");

  // * HANDLER FUNCTION TO MANAGE USER INPUT WHILE LOGIN
  // const loginInput = (e) => {
  //   setLoginUserAddress(e.target.value);
  // };

  // * LOGGING USER IN
  const login = async () => {
    // getting available accounts
    const accounts = await ethereum.request({ method: "eth_accounts" });

    // calling smart contract's function
    try {
      // checks if user exist or not
      const userExist = await AuthContract.methods
        .login(loginUserAddress, deployedMain) // login functionality is not completly set yet that's why khali true or false rakhyu che
        .call({ from: accounts[0], gas: 2000000 });

      // if user exist then - fetching user's data to show in our app
      if (userExist) {
        const findMember = await MainContract.methods
          .findMember(loginUserAddress, false)
          .call({ from: accounts[0], gas: 2000000 });

        setUserLoggedIn(true);
        setLoggedInUserInfo(findMember);
        alert("Login successful!");

        getPosts();
      }

      // if user does not exist
      else {
        alert("User does not exist. Request Approval First!");
      }
    } catch (err) {
      // catching errors
      console.error(err.message);
    }
  };

  // * LOGGING USER OUT
  const logout = () => {
    setUserLoggedIn(false);
    setLoggedInUserInfo({
      post: "",
      dept: "",
      name: "",
      userAddress: "",
    });
    alert("Logged Out Successfully!");
  };

  // ! POST FUNCTIONALITIES AND IT'S STATES

  // * STATE TO MANAGE APPROVED POSTS - NEEDED IN NEWS COMPONENT TO DISPLAY POSTS TO ALL THE USERS
  const [oldPosts, setOldPosts] = useState([]);

  // * STATE TO MANAGE REQUESTED POST - NEEDED IN PROFILE COMPONENT TO APPROVE POSTS
  const [requestedPosts, setRequestedPosts] = useState([]);

  // * STATE TO MANAGE USER'S INPUT WHILE WRITING POST
  const [postInput, setPostInput] = useState("");

  // * HANDLER FUNCTION TO MANAGE USER'S INPUT WHILE WRITING POST
  const handlePostInput = async (e) => {
    // ! do the converting and ading stuff here and then set post input

    // const img = new File([], "Name", { type: "image/png" });
    // const metaData = await client.store({
    //   name: "Jani",
    //   description: "New Post",
    //   image: img,
    // });

    // const someData = new Blob([e.target.value]);
    // const cid = await client.storeBlob(someData);
    // console.log(cid);

    setPostInput(e.target.value);
  };

  // * ADDING POST - IF NOT STUDENT THEN DIRECTLY ADD OTHERWISE REQUEST POST
  const post = async (e) => {
    e.preventDefault();
    const newPost = {
      postCreatedBy: loggedInUserInfo.userAddress,
      postInfo: postInput,
    };

    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      // check for user if it is student or not
      if (loggedInUserInfo.post != "STUDENT") {
        const post = await PostNewsContract.methods
          .postNews(
            postInput,
            loggedInUserInfo.userAddress, // ! changed here
            loggedInUserInfo.userAddress,
            false
          )
          .send({ from: accounts[0], gas: 2000000 });
        setOldPosts([...oldPosts, newPost]);
        setPostInput("");
        getPosts();
        alert("News Shared Successfully!");
      } else {
        const post = await PostNewsContract.methods
          .postNews(
            postInput,
            loggedInUserInfo.userAddress, // ! changed here
            loggedInUserInfo.userAddress,
            true
          )
          .send({ from: accounts[0], gas: 2000000 });
        setPostInput("");
        alert("Post Requested, Waiting for approval.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // ! repost code
  const reshare = async (idx) => {
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      const repost = await PostNewsContract.methods.reshare(idx).send({
        from: accounts[0],
        gas: 2000000,
      });
      getPosts();
      alert("Post Re-Shared successfully!");
    } catch (error) {
      console.error(error.message);
    }
  };

  // * GETTING ALL THE APPROVED POST - TO DISPLAY ON HOME/NEWS COMPONENT FOR ALL USERS
  const getPosts = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      const allPosts = await PostNewsContract.methods
        .getAllPosts(false)
        .call({ from: accounts[0], gas: 2000000 });

      setOldPosts(allPosts);
    } catch (error) {
      console.error(error.message);
    }
  };

  // * GETTING REQUESTED POSTS - TO DISPLAY IN PROFILE COMPONENT
  const getRequestedPosts = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      const allRequestedPosts = await PostNewsContract.methods
        .getAllPosts(true)
        .call({ from: accounts[0], gas: 2000000 });

      setRequestedPosts(allRequestedPosts);
      setShowApproovedMemberInfo(false);
      setShowRequestedMemberInfo(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // * APPROVING POST
  const approvePost = async (postIndex) => {
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      const approvePost = await PostNewsContract.methods
        .approvePost(postIndex)
        .send({ from: accounts[0], gas: 9000000 });

      getPosts();
      getRequestedPosts();
      alert("Post Approved!");
    } catch (error) {
      console.error(error.message);
    }
  };

  // * useEffect to get some default values
  useEffect(() => {
    // * getting posts
    getPosts();

    // !!!!!!!!!!!!

    //  * to get account
    const getAccout = async () => {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      // * for signup

      setMemberInfo({
        ...memberInfo,
        userAddress: accounts[0],
      });

      // * for login
      setLoginUserAddress(accounts[0]);
    };
    getAccout();

    // * to handle account change
    window.ethereum.on("accountsChanged", function (accounts) {
      // * for signup
      setMemberInfo({
        ...memberInfo,
        userAddress: accounts[0],
      });
      // * for login
      setLoginUserAddress(accounts[0]);
      // * to log out the user
      window.location.reload();
    });

    // !!!!!!!!!!!!
  }, []);

  return (
    <div>
      <Router>
        <Navbar logout={logout} userLoggedIn={userLoggedIn} />
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                login={login}
                // loginInput={loginInput}
                // loginUserAddress={loginUserAddress}
              />
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Signup
                handleChange={handleChange}
                requestMember={requestMember}
                memberInfo={memberInfo}
              />
            }
          ></Route>
          <Route
            path="/"
            element={
              <News
                loggedInUserInfo={loggedInUserInfo}
                postInput={postInput}
                handlePostInput={handlePostInput}
                post={post}
                oldPosts={oldPosts}
                // getPosts={getPosts}
                userLoggedIn={userLoggedIn}
                getCreator={getCreator}
                cretorInfo={cretorInfo}
                reshare={reshare}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                memberInfo={memberInfo}
                setMemberInfo={setMemberInfo}
                getRequestedMember={getRequestedMember}
                getApprovedMember={getApprovedMember}
                userLoggedIn={userLoggedIn}
                requestedMembersArray={requestedMembersArray}
                approovedMembersArray={approovedMembersArray}
                logout={logout}
                loggedInUserInfo={loggedInUserInfo}
                approoveMember={approoveMember}
                showApproovedMemberInfo={showApproovedMemberInfo}
                showRequestedMemberInfo={showRequestedMemberInfo}
                getRequestedPosts={getRequestedPosts}
                requestedPosts={requestedPosts}
                approvePost={approvePost}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
