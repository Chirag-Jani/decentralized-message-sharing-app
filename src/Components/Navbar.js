import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="container-fluid mb-5 p-0">
      <div className="d-flex justify-content-evenly bg-dark text-white w-100 p-3">
        <h3>
          <Link className="text-white" to="/login">
            {" "}
            Login / Register
          </Link>
        </h3>
        <h3>
          <Link className="text-white" to="/news">
            {" "}
            News
          </Link>
        </h3>
        <h3>
          <Link className="text-white" to="/profile">
            {" "}
            Profile
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default Navbar;
