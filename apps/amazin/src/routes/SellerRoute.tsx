import { useSelector } from 'react-redux';

import { Redirect, Route } from 'src/routes/SuspenseRoute';

export type SellerBaseRouteProps = RouterProps & {
  userRole?: 'isAdmin' | 'isSeller' | ('isAdmin' | 'isSeller')[];
  rest?: RestProps;
};

export function SellerBaseRoute({ component: Component, userRole, ...rest }: SellerBaseRouteProps) {
  const { userInfo }: { userInfo: UserInfoType } = useSelector((state: AppState) => state.userSignin);
  const allowedRoles = Array.isArray(userRole) ? userRole : [userRole];
  const hasAccess = userRole && allowedRoles.some((role) => role && userInfo?.[role]);

  return (
    <Route {...rest} render={(props: unknown) => (hasAccess ? <Component {...props} /> : <Redirect to="/signin" />)} />
  );
}

export default function SellerRoute(props: SellerBaseRouteProps) {
  return <SellerBaseRoute {...props} userRole="isSeller" />;
}
