import { useSelector } from 'react-redux';

import { Redirect, Route } from 'src/routes/SuspenseRoute';

export function SellerBaseRoute({ component: Component, userRole, ...rest }) {
  const { userInfo } = useSelector((state: AppState) => state.userSignin);

  return (
    <Route
      {...rest}
      render={(props: Props) => (userInfo && userInfo[userRole] ? <Component {...props} /> : <Redirect to="/signin" />)}
    />
  );
}

export default function SellerRoute(props: Props) {
  return <SellerBaseRoute userRole="isSeller" {...props} />;
}
