import React, { useContext } from "react";
import { UserContext } from "./userContext";
import { Redirect, Route } from "react-router-dom";

const SecureRoute = ({ component: Component, loggedIn, ...otherProps }) => {
  console.log(loggedIn);
  return (
    <Route
      {...otherProps}
      render={(props) =>
        loggedIn ? (
          <Component {...otherProps} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  // <Route
  //   {...otherProps}
  //   render={(props) =>
  //     loggedIn ? (
  //       <Redirect to="login" />
  //     ) : (
  //       // <Component {...otherProps} {...props} />
  //       <Redirect to="login" />
  //     )
  //   }
  // />
};

export default SecureRoute;
