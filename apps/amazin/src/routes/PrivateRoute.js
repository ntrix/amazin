import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from '../layouts/SuspenseRoute';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { userInfo } = useSelector((state) => state.userSignin);
  const redirect = rest?.path?.slice(1) || '/';

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/signin?redirect=${redirect}`} />
        )
      }
    />
  );
}
