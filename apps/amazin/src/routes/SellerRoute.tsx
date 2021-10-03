import { useSelector } from 'react-redux';

import { Redirect, Route } from 'src/routes/SuspenseRoute';

type PropType = {
  component: ComponentType;
  userRole: 'isAdmin' | 'isSeller';
  rest?: RestProps;
  path?: string;
};

export function SellerBaseRoute({ component: Component, userRole, ...rest }: PropType) {
  const { userInfo }: { userInfo: UserInfoType } = useSelector((state: AppState) => state.userSignin);

  return (
    <Route
      {...rest}
      render={(props: Props) => (userInfo?.[userRole] ? <Component {...props} /> : <Redirect to="/signin" />)}
    />
  );
}

export default function SellerRoute(props: Props) {
  return <SellerBaseRoute userRole="isSeller" {...props} />;
}
