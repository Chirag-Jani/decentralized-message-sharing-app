import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {
  const { login, loginInput, loginUserAddress } = props;

  // function call on login button click

  return (
    <>
      <div className="container w-25 mb-5">
        <h2 className="mt-0 mb-3">Login Your Account</h2>
        <div className="mb-3">
          <label className="form-label">Wallet Address:</label>
          <input
            type="text"
            className="form-control"
            placeholder="0x...000"
            value={loginUserAddress}
            onChange={loginInput}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={login}
          href="/login"
        >
          Login
        </button>
        <p className="mt-2">
          Don't have an account?
          <Link to="/signup">Signup</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
