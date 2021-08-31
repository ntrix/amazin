import { useSelector } from 'react-redux';

import { Redirect, Route } from 'src/layouts/SuspenseRoute';

export function SellerBaseRoute({ component: Component, userRole, ...rest }) {
  const { userInfo } = useSelector((state) => state.userSignin);

  return (
    <Route
      {...rest}
      render={(props) => (userInfo && userInfo[userRole] ? <Component {...props} /> : <Redirect to="/signin" />)}
    />
  );
}

export default function SellerRoute(props) {
  return <SellerBaseRoute userRole="isSeller" {...props} />;
}
