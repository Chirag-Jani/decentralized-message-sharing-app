import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {
  const { login } = props;

  // function call on login button click

  return (
    <>
      <div className="container w-25 mb-5">
        <h2 className="mt-0 mb-3">Login Your Account</h2>
        <div className="mb-3"></div>
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
