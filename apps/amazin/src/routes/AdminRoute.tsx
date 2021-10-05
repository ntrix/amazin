import { SellerBaseRoute } from './SellerRoute';

export default function AdminRoute(props: RestProps) {
  return <SellerBaseRoute {...props} userRole="isAdmin" />;
}
