import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isExpired } from "../services/authService";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isExpired() ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
