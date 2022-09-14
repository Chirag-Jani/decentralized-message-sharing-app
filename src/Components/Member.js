import React, { useEffect, useState } from "react";
import web3 from "../contractInfo/Web3";
// import testContract from "../contractInfo/TestContract.json";
import testContract from "../contractInfo/TestContract";

function Member() {
  // const [newx, setNewx] = useState(0);

  // const getX = async () => {
  //   // const accounts = await web3.eth.getAccounts();
  //   const accounts = await ethereum.request({ method: "eth_accounts" }); // getting the eth accounts
  //   console.log(accounts);
  //   console.log(ethereum.isConnected());

  //   try {
  //     // issue is here
  //     const x = await testContract.methods.getX().call({
  //       from: accounts[0],
  //     });
  //     // const x = await testContract.methods;

  //     console.log(x);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const setX = async () => {
  //   // const accounts = await web3.eth.getAccounts();
  //   const accounts = await ethereum.request({ method: "eth_accounts" }); // getting the eth accounts
  //   // console.log(accounts);
  //   // console.log(ethereum.isConnected());

  //   try {
  //     // issue is here
  //     const jj = await testContract.methods
  //       .setX(newx)
  //       .send({ from: accounts[0] });
  //     console.log(jj);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getMethods = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" }); // getting the eth accounts
    console.log(accounts);
    console.log(ethereum.isConnected());
  };

  return (
    <>
      <div className="container">
        <h3 className="text-center my-4">Members Component</h3>
        {/* Just testing  - starts */}
        {/* <button className="btn btn-primary m-5" onClick={getX}>
          getX
        </button>
        <input
          type="text"
          value={newx}
          onChange={(e) => {
            setNewx(e.target.value);
          }}
        />
        <button className="btn btn-danger m-5" onClick={setX}>
          setX
        </button> */}
        {/* Just testing  - ends */}
        <button onClick={getMethods}>Get Available Methods</button>
        {/* string memory _post,
        string memory _dept,
        string memory _name,
        address _userAddress,
        address _Requestcontract,
        address _UserContract */}
      </div>
    </>
  );
}

export default Member;

// use window.eth to sign the transaction
// connect metamask with ganache
// window.ethereum - read docs

// changes in TestContract.js file - regarding export

// have to deploy contracts each time kem ke ek vaar band thay pachi discard thai jaay

// frontend ma window.ethereum.getAccounts() thi j thase call

// look for integration of ganache cli with metamask

// web3.js vali file ma dhyan rakhi ne export karvaanu che kem ke version wise alag alag che system
