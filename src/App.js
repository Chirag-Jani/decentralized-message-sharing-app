// 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
// 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
// 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB
// 0x617F2E2fD72FD9D5503197092aC168c91465E7f2
// 0x17F6AD8Ef982297579C203069C1DbfFE4348c372

///////////////////////////////////////

// currnet issues:
// login karti vakhte setState na lidhe error aave che (setLoginUserAddress ma time lage che etle 2 var click karvu pade che)
// post remove karvani one approved
// 2 vaar click kariye to 2 vaar add kari dey che array ma (remove karsu etle aa issue nai avve)
// refresh kariye etle logout thai jaay che
// gotta divide contracts into multiple
// webpack 4 issues remains
// i thik i can use metamask directly for deployment maybe and we don't need ganache anymore

///////////////////////////////////////

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// importing components
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import News from "./Components/News";
import Profile from "./Components/Profile";

// importing contract
import Contract from "./contractInfo/Contract";

function App() {
  // to navigate to another page on login, logout, and signup

  // state that checks if user is logged in or not
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  // state to manage logged in user's information
  const [loggedInUserInfo, setLoggedInUserInfo] = useState({
    post: "",
    dept: "",
    name: "",
    userAddress: "",
    allPostsByUser: null,
  });

  // state to manage information of users while requestin / registration
  const [memberInfo, setMemberInfo] = useState({
    post: "",
    dept: "",
    name: "",
    // userAddress: "",
  });

  // onChange function to handle member info while registration
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

  // getting available methods
  const getMethods = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" }); // getting the eth accounts
    console.log("Used Account: " + accounts);
    console.log("Account Connected: " + ethereum.isConnected());
    const availableMethods = await Contract.methods;
    console.log(availableMethods);

    /////////////////////////////////////
  };

  // ///////////////////////////////////////////////////////////////////////////////////////////////////
  const [showApproovedMemberInfo, setShowApproovedMemberInfo] = useState(false);
  const [showRequestedMemberInfo, setShowRequestedMemberInfo] = useState(false);

  // getting requested Members
  const [requestedMembersArray, setRequestedMembersArray] = useState([]);

  const getRequestedMember = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      const requestedMembers = await Contract.methods
        .getApprovedOrRequestedMember(true)
        .call({ from: accounts[0], gas: 2000000 });
      setRequestedMembersArray(requestedMembers);
      setShowApproovedMemberInfo(false);
      setShowRequestedMemberInfo(true);
    } catch (error) {
      console.log(error);
    }
    console.log(requestedMembersArray);
  };

  // getting approoved members
  const [approovedMembersArray, setApproovedMembersArray] = useState([]);
  const getApprovedMember = async () => {
    try {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      const approvedMembers = await Contract.methods
        .getApprovedOrRequestedMember(false)
        .call({ from: accounts[0], gas: 2000000 });

      setApproovedMembersArray(approvedMembers);
      setShowApproovedMemberInfo(true);
      setShowRequestedMemberInfo(false);
    } catch (error) {
      console.log(error);
    }
    console.log(approovedMembersArray);
  };

  // requesting member - registration
  const requestMember = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      const requestMember = await Contract.methods
        .addOrRequestMember(
          memberInfo.post,
          memberInfo.dept,
          memberInfo.name,
          accounts[0],
          true
        )
        .send({ from: accounts[0], gas: 2000000 });

      setMemberInfo({ post: "", dept: "", name: "", userAddress: "" });
    } catch (err) {
      console.log(
        "Transaction Reverted due to Require Statement or Out Of Gas."
      );
    }
  };

  // approoving member
  const approoveMember = async (userAddress) => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      const approove = await Contract.methods
        .approoveRequest(userAddress, loggedInUserInfo.userAddress)
        .send({ from: accounts[0], gas: 2000000 });
      console.log("Member Appooved");

      // if user is now allowed to approve user (because they are at higher position), then alert the user when the require statement is reverting the contract
      // if (!approove) {
      //   alert("na bhai");
      // }
    } catch (err) {
      console.log(
        "Transaction Reverted due to Require Statement or Out Of Gas." + err
      );
    }
  };

  // state to manage user's input value while login
  const [loginUserAddress, setLoginUserAddress] = useState("");

  // onChange function to handle user's input while trying to login
  // const loginInput = (e) => {
  //   setLoginUserAddress(e.target.value);
  // };

  // login function
  const login = async () => {
    // getting available accounts
    const accounts = await ethereum.request({ method: "eth_accounts" });
    setLoginUserAddress(accounts[0]);

    // calling smart contract's function
    try {
      // checks if user exist or not
      const userExist = await Contract.methods
        .login(accounts[0])
        .call({ from: accounts[0], gas: 200000 });

      // if user exist then - fetching user's data to show in our app
      if (userExist) {
        const findMember = await Contract.methods
          .findMember(loginUserAddress, false)
          .call({ from: accounts[0], gas: 2000000 });

        setUserLoggedIn(true);
        setLoggedInUserInfo(findMember);
        // alert("Login successful!");
        setLoginUserAddress("");
        getPosts();
      }

      // if user does not exist
      else {
        alert("User does not exist. Request Approval First!");
        setLoginUserAddress("");
      }
    } catch (err) {
      // catching errors
      console.log(
        "Transaction Reverted due to Require Statement or Out Of Gas." + err
      );
    }
  };

  // function to logout
  const logout = () => {
    setUserLoggedIn(false);
    setLoggedInUserInfo({
      post: "",
      dept: "",
      name: "",
      userAddress: "",
    });
  };

  // state to manage posted news now
  const [oldPosts, setOldPosts] = useState([]);

  // managing requested posts
  const [requestedPosts, setRequestedPosts] = useState([]);

  // state to manage user's text while posting
  const [postInput, setPostInput] = useState("");

  // onChange function to handle user's text input
  const handlePostInput = (e) => {
    setPostInput(e.target.value);
  };

  // function to finally add new post and write on our smart contract
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
        const post = await Contract.methods
          .postNews(postInput, loggedInUserInfo.userAddress, false)
          .send({ from: accounts[0], gas: 2000000 });
        setOldPosts([...oldPosts, newPost]);
        setPostInput("");
      } else {
        const post = await Contract.methods
          .postNews(postInput, loggedInUserInfo.userAddress, true)
          .send({ from: accounts[0], gas: 2000000 });
        setPostInput("");
      }
    } catch (error) {
      console.log(error);
    }
    console.log("posted");
  };

  // this will fetch all the posts when the component will be loaded

  const getPosts = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      const allPosts = await Contract.methods
        .getAllPosts(false)
        .call({ from: accounts[0], gas: 2000000 });

      setOldPosts(allPosts);
      console.log(oldPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequestedPosts = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      const allRequestedPosts = await Contract.methods
        .getAllPosts(true)
        .call({ from: accounts[0], gas: 2000000 });

      setRequestedPosts(allRequestedPosts);
      console.log(allRequestedPosts);
      setShowApproovedMemberInfo(false);
      setShowRequestedMemberInfo(false);
    } catch (error) {
      console.log(error);
    }
  };

  const approvePost = async (postCreator) => {
    console.log("approved" + postCreator);

    try {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      const approvePost = await Contract.methods
        .approvePost(postCreator, loggedInUserInfo.userAddress)
        .send({ from: accounts[0], gas: 2000000 });

      getPosts();
      getRequestedPosts();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(
  //   () => {
  //     getAllPosts();
  //   },
  //   // whenever oldPosts will update, useEffect will be called
  //   []
  // );

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
                getPosts={getPosts}
                userLoggedIn={userLoggedIn}
              />
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                memberInfo={memberInfo}
                setMemberInfo={setMemberInfo}
                getMethods={getMethods}
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
