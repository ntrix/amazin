import { SellerBaseRoute } from './SellerRoute';

export default function AdminRoute(props: Props) {
  return <SellerBaseRoute userRole="isAdmin" {...props} />;
}
