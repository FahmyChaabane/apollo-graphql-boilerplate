import React from "react";
import currentUser, { isAdmin } from "../services/apollo/cache";
import { Link } from "react-router-dom";
import { isExpired } from "../services/authService";

const Header = () => {
  return (
    <div>
      <Link to="/home">
        <span> home</span>
      </Link>

      {!isExpired() ? (
        <React.Fragment>
          <Link to={`/profile/${currentUser()._id}`}>
            <span> {currentUser && currentUser().username}</span>
          </Link>
          <Link to="/logout">
            <span> logout</span>
          </Link>
          {isAdmin() && <Link to="/users">Users</Link>}
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
