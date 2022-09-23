import React, { useState } from "react";
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
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loggedInUserInfo, setLoggedInUserInfo] = useState({
    post: "",
    dept: "",
    name: "",
    userAddress: "",
  });

  const [memberInfo, setMemberInfo] = useState({
    post: "",
    dept: "",
    name: "",
    userAddress: "",
  });

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
    } catch (error) {
      console.log(error);
    }
    console.log(approovedMembersArray);
  };

  // requesting member
  const requestMember = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      const requestMember = await Contract.methods
        .addOrRequestMember(
          memberInfo.post,
          memberInfo.dept,
          memberInfo.name,
          memberInfo.userAddress,
          true
        )
        .send({ from: accounts[0], gas: 2000000 });
    } catch (err) {
      console.log(
        "Transaction Reverted due to Require Statement or Out Of Gas."
      );
    }
  };

  // approove member
  const approoveMember = async (userAddress) => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      const approove = await Contract.methods
        .approoveRequest(userAddress, loggedInUserInfo.userAddress)
        .send({ from: accounts[0], gas: 2000000 });
      console.log("Member Appooved");
    } catch (err) {
      console.log(
        "Transaction Reverted due to Require Statement or Out Of Gas." + err
      );
    }
  };

  // Login Function
  const [loginUserAddress, setLoginUserAddress] = useState("");

  const loginInput = (e) => {
    setLoginUserAddress(e.target.value);
  };

  const login = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    try {
      const findMember = await Contract.methods
        .findMember(loginUserAddress, false)
        .call({ from: accounts[0], gas: 2000000 });

      setUserLoggedIn(true);
      setLoggedInUserInfo(findMember);
      // setLoginUserAddress("");
    } catch (err) {
      console.log(
        "Transaction Reverted due to Require Statement or Out Of Gas." + err
      );
    }
  };

  const logout = () => {
    setUserLoggedIn(false);
    setLoggedInUserInfo({
      post: "",
      dept: "",
      name: "",
      userAddress: "",
    });
  };

  // 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
  // 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
  // 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB
  // 0x617F2E2fD72FD9D5503197092aC168c91465E7f2
  // 0x17F6AD8Ef982297579C203069C1DbfFE4348c372

  return (
    <div>
      <Router>
        <Navbar logout={logout} userLoggedIn={userLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={<Login login={login} loginInput={loginInput} />}
          ></Route>
          <Route
            path="/signup"
            element={
              <Signup
                handleChange={handleChange}
                requestMember={requestMember}
              />
            }
          ></Route>
          <Route path="/news" element={<News />}></Route>
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
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
