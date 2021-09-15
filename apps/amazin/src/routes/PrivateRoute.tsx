import { useSelector } from 'react-redux';

import { Redirect, Route } from 'src/routes/SuspenseRoute';

type PropType = {
  component?: ComponentType;
  path: string;
  exact?: boolean;
  children?: Children;
  rest?: Props;
};

export default function PrivateRoute({ component: Component, children, path, ...rest }: PropType) {
  const { userInfo } = useSelector((state: AppState) => state.userSignin);
  const redirect = path?.slice(1) || '/';

  return (
    <Route
      path={path}
      {...rest}
      render={(props: Props) =>
        userInfo ? children || <Component {...props} /> : <Redirect to={`/signin?redirect=${redirect}`} />
      }
    />
  );
}
