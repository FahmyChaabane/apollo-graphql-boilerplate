import React from "react";
import { Link } from "react-router-dom";
import currentUser from "../services/apollo/cache";

const Header = () => {
  return (
    <div>
      <Link to="/home">
        <span> home</span>
      </Link>

      {currentUser() ? (
        <React.Fragment>
          <Link to="/profile">
            <span> {currentUser().username}</span>
          </Link>
          <Link to="/logout">
            <span> logout</span>
          </Link>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link to="/register">
            <span> register</span>
          </Link>
          <Link to="/login">
            <span> login</span>
          </Link>
        </React.Fragment>
      )}
    </div>
  );
};

export default Header;
