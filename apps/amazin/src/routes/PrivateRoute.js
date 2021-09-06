import { useShadow } from 'src/hooks/useShadow';

import { Redirect, Route } from 'src/routes/SuspenseRoute';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { userInfo } = useShadow();
  const redirect = rest?.path?.slice(1) || '/';

  return (
    <Route
      {...rest}
      render={(props) => (userInfo ? <Component {...props} /> : <Redirect to={`/signin?redirect=${redirect}`} />)}
    />
  );
}
