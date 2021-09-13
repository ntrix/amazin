import { useSelector } from 'react-redux';

import { Redirect, Route } from 'src/routes/SuspenseRoute';

type PropType = {
  component: ComponentType;
  path: string;
  rest?: Props;
};

export default function PrivateRoute({ component: Component, path, ...rest }: PropType) {
  const { userInfo } = useSelector((state: AppState) => state.userSignin);
  const redirect = path?.slice(1) || '/';

  return (
    <Route
      {...rest}
      render={(props: Props) =>
        userInfo ? <Component {...props} /> : <Redirect to={`/signin?redirect=${redirect}`} />
      }
    />
  );
}
