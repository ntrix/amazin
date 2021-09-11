import { lazy } from 'react';

import { Route, Switch } from 'src/routes/SuspenseRoute';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import SellerRoute from './SellerRoute';

const Screen404 = lazy(() => import(/* webpackPrefetch: true */ '../screens/Auth/Screen404'));
const MapScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/User/MapScreen'));
const OrderHistoryScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Order/OrderHistoryScreen'));
const OrderListScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Order/OrderListScreen'));
const ProductListScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Product/ProductListScreen'));
const ProfileScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/User/ProfileScreen'));
const UserEditScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/User/UserEditScreen'));
const UserListScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/User/UserListScreen'));

export default function TokenRoutes() {
  return (
    <Switch>
      <PrivateRoute path="/order-history" component={OrderHistoryScreen} />
      <PrivateRoute path="/profile" component={ProfileScreen} />
      <PrivateRoute path="/map" component={MapScreen} />
      <AdminRoute path="/product-list" component={ProductListScreen} exact />
      <AdminRoute path="/product-list/pageNumber/:pageNumber" component={ProductListScreen} exact />
      <AdminRoute path="/order-list" component={OrderListScreen} exact />
      <AdminRoute path="/user-list" component={UserListScreen} />
      <AdminRoute path="/user/:id/edit" component={UserEditScreen} />
      <SellerRoute path="/product-list/seller" component={ProductListScreen} exact />
      <SellerRoute path="/product-list/seller/pageNumber/:pageNumber" component={ProductListScreen} exact />
      <SellerRoute path="/order-list/seller" component={OrderListScreen} />
      <Route component={Screen404} exact />
    </Switch>
  );
}
