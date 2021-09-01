import { SellerBaseRoute } from './SellerRoute';

export default function AdminRoute(props) {
  return <SellerBaseRoute userRole="isAdmin" {...props} />;
}
