import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/slices/auth";

const RedirectRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector(authSelector);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default withRouter(RedirectRoute);
