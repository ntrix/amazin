import { useSelector } from 'react-redux';

import { Redirect, Route } from 'src/routes/SuspenseRoute';

export default function PrivateRoute({ component: Component, children, path, ...rest }: RouterProps) {
  const { userInfo } = useSelector((state: AppState) => state.userSignin);
  const redirect = path?.slice(1) || '/';

  return (
    <Route
      path={path}
      {...rest}
      render={(props: RenderProps) =>
        userInfo ? children || <Component {...props} /> : <Redirect to={`/signin?redirect=${redirect}`} />
      }
    />
  );
}
