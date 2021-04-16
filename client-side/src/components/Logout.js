import React, { useEffect } from "react";
import { logout } from "../services/authService";

const Logout = () => {
  useEffect(() => {
    logout();
    window.location = "/login";
  }, []);

  return null;
};

export default Logout;
