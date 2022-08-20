// this one is not necessary for you
// I have just listed functions and variables here
import React from "react";

function ContractInfo() {
  return (
    <div className="text-center">
      <h1 className="text-center mx-5">Contract Information</h1>
      <p>
        Here is the list of all the variables and functions in the repective
        contracts. <br /> Some will be used in UI (based on user interactions) &
        some are for internal use. <br /> Variables and Functions for users are
        listed out in their respective components.
      </p>
      <div className="d-flex justify-content-evenly mx-5 px-5 text-start">
        <div className="request">
          <h3>Request Contract functions and variables</h3>
          <h5>Variables</h5>
          <p> mapping address to bool</p>
          <p>
            request array - stores all the request - addresses only <br />{" "}
            <br /> not needed - using getEveryRequestedMember
          </p>
          <p>discarded requests array</p>
          <p>approved requests array - getEveryMember</p>
          <h5>Functions</h5>
          <p>getRequest function - returns all the requests </p>
          <p>addRequest - not for UI</p>
          <p>approveRequest - approves request</p>
          <p>discardRequest - discards request</p>
        </div>
        <div className="member">
          <h3>Members contract</h3>
          <h5>Variables</h5>
          <p>
            Member struct - with post, dept, name, userAddress, power arrays
          </p>
          <p>RequestedMember struct - same</p>
          <p>
            memberRequestPointer - takes address and returns the Member struct -
            mapping
          </p>
          <p>memberPointer - returns all the accepted members struct</p>
          <h5>Functions - needed in the frontend</h5>
          <p>requestMember - returns all the requested members</p>
          <p>getEveryRequestedMember</p>
          <p>findRequestedMember - finds requested member through address</p>
          <p>addMember - adds mamber to the list</p>
          <p>getEveryMember - returns all the members</p>
          <p>findMember - finds approved member through address</p>
        </div>
        <div className="user">
          <h3>User Contract</h3>
          <h5>Variables</h5>
          <p>
            currUser array - consists of all the approved members' addresses{" "}
            <br /> not needed - using getEveryMember
          </p>
          <h5>Functions</h5>
          <p>
            getUsers - returns all the users' addresses <br /> not needed -
            using getEveryMember
          </p>
          <p>
            requestSignUp - not needed as we are using requestMember function in
            Member Contract
          </p>
          <p>login - to login the user</p>
        </div>
      </div>
    </div>
  );
}

export default ContractInfo;
