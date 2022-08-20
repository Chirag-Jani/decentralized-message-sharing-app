import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  // maintaining states of user input
  const [role, setRole] = useState("");
  const [dept, setDept] = useState("");
  const [name, setName] = useState("");
  const [add, setAdd] = useState("");

  // requesting member on button click
  const requestMember = (e) => {
    e.preventDefault();
    alert(
      "Member Requested using requestMember function: " +
        role +
        " " +
        dept +
        " " +
        name +
        " " +
        add
    );
  };

  return (
    <>
      <div className="container w-25 mt-5 p-5 pt-0">
        <h2 className="mt-0 mb-3">Register Member</h2>
        <form>
          <div className="mb-3">
            <label className="me-3">Select Role:</label>
            <select
              aria-label="Default select example"
              className="text-center"
              id="fruits"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option defaultValue={true}>Select Role</option>
              <option value="DEAN">DEAN</option>
              <option value="HOD">HOD</option>
              <option value="STAFF">STAFF</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="me-3">Select Department:</label>
            <select
              aria-label="Default select example"
              className="text-center"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            >
              <option defaultValue={true}>Select Role</option>
              <option value="CGPIT">CGPIT</option>
              <option value="BMIIT">BMIIT</option>
              <option value="SRIMCA">SCRIMCA</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="me-3">Name:</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="me-3">Address:</label>
            <input
              type="text"
              placeholder="0x..."
              value={add}
              onChange={(e) => setAdd(e.target.value)}
            />
          </div>
          <a href="/" className="btn btn-primary" onClick={requestMember}>
            Request Approval
          </a>
        </form>
        <p className="mt-2">
          Already have an account? login
          <Link to="/login">Login</Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
