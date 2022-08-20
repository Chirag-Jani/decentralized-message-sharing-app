import React from "react";
import web3 from "../contractInfo/Web3";
import testContract from "../contractInfo/TestContract.json";

function Member() {
  const getX = async () => {
    const accounts = await web3.eth.getAccounts();

    try {
      // issue is here
      const x = await testContract.methods.getX().call({ from: accounts[0] });

      console.log(x);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <h3 className="text-center my-4">Members Component</h3>
        <button className="btn btn-primary m-5" onClick={getX}>
          getX
        </button>
      </div>
    </>
  );
}

export default Member;
