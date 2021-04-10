import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/home">home</Link>
      <Link to="/register">register</Link>
      <Link to="/login">login</Link>
      <Link to="/logout">logout</Link>
    </div>
  );
};

export default Header;
