import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  // handles state of userInput
  const [address, setAddress] = useState("");

  // updates state of userInput
  const walletInput = (e) => {
    setAddress(e.target.value);
  };

  // function call on login button click
  const login = (e) => {
    e.preventDefault();
    alert("Member Login using login function: " + address);
  };

  return (
    <>
      <div className="container w-25 mb-5">
        <h2 className="mt-0 mb-3">Login Your Account</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Wallet Address:</label>
            <input
              type="text"
              className="form-control"
              placeholder="0x..."
              onChange={walletInput}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={login}
            href="/"
          >
            Login
          </button>
        </form>
        <p className="mt-2">
          Don't have an account?
          <Link to="/signup">Signup</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
