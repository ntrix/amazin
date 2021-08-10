import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from './RouteBoundary';

export default function SellerRoute({ component: Component, ...rest }) {
  const { userInfo } = useSelector((state) => state.userSignin);

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo?.isSeller ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
}
