import { SellerBaseRoute, SellerBaseRouteProps } from './SellerRoute';

export default function AdminRoute(props: SellerBaseRouteProps) {
  return <SellerBaseRoute {...props} userRole="isAdmin" />;
}
