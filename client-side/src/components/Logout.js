import React, { useEffect } from "react";
import { logout } from "../services/authService";

const Logout = (props) => {
  useEffect(() => {
    logout();
    props.history.push("/login");
  }, []);

  return null;
};

export default Logout;
