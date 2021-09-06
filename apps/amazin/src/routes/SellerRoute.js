import { useShadow } from 'src/hooks/useShadow';

import { Redirect, Route } from 'src/routes/SuspenseRoute';

export function SellerBaseRoute({ component: Component, userRole, ...rest }) {
  const { userInfo } = useShadow();

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
