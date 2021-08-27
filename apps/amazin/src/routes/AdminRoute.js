import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from './RouteBoundary';

export default function AdminRoute({ component: Component, ...rest }) {
  const { userInfo } = useSelector((state) => state.userSignin);

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo?.isAdmin ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}