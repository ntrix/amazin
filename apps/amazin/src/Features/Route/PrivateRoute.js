import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { userInfo } = useSelector((state) => state.userSignin);
  const redirect = rest?.path?.slice(1) || "/";

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to={`/signin?redirect=${redirect}`} />
        )
      }
    ></Route>
  );
}
