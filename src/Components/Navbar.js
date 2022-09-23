import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  const { logout, userLoggedIn } = props;

  if (userLoggedIn) {
    return (
      <div className="container-fluid mb-5 p-0">
        <div className="d-flex justify-content-evenly bg-dark text-white w-100 p-3">
          <button className="btn btn-danger mx-1" onClick={logout}>
            Logout
          </button>
          <h4>
            <Link className="text-white" to="/news">
              {" "}
              News
            </Link>
          </h4>
          <h4>
            <Link className="text-white" to="/profile">
              {" "}
              Profile
            </Link>
          </h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid mb-5 p-0">
        <div className="d-flex justify-content-evenly bg-dark text-white w-100 p-3">
          <h4>
            <Link className="text-white" to="/">
              {" "}
              Login / Register
            </Link>
          </h4>
          <h4>
            <Link className="text-white" to="/news">
              {" "}
              News
            </Link>
          </h4>
          <h4>
            <Link className="text-white" to="/profile">
              {" "}
              Profile
            </Link>
          </h4>
        </div>
      </div>
    );
  }
}

export default Navbar;
