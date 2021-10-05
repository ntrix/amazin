import { lazy } from 'react';

import { Route, Switch } from 'src/routes/SuspenseRoute';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import SellerRoute from './SellerRoute';

const Screen404: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Auth/Screen404'));
const MapScreen: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ '../screens/User/MapScreen'));
const OrderHistoryScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Order/OrderHistoryScreen')
);
const OrderListScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Order/OrderListScreen')
);
const ProductListScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Product/ProductListScreen')
);
const UserProfile: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/User/ProfileScreen/UserProfile')
);
const UserEditScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/User/UserEditScreen')
);
const UserListScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/User/UserListScreen')
);
const ProductEditScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Product/ProductEditScreen')
);

export default function TokenRoutes() {
  return (
    <Switch>
      <PrivateRoute path="/order-history" component={OrderHistoryScreen} />
      <PrivateRoute path="/profile" component={UserProfile} />
      <PrivateRoute path="/map" component={MapScreen} />
      <AdminRoute path="/product-list" component={ProductListScreen} exact />
      <AdminRoute path="/product-list/pageNumber/:pageNumber" component={ProductListScreen} exact />
      <AdminRoute path="/order-list" component={OrderListScreen} exact />
      <AdminRoute path="/user-list" component={UserListScreen} />
      <AdminRoute path="/user/:id/edit" component={UserEditScreen} />
      <AdminRoute path="/product/:id/edit" component={ProductEditScreen} exact />
      <SellerRoute path="/product/:id/edit" component={ProductEditScreen} exact />
      <SellerRoute path="/product-list/seller" component={ProductListScreen} exact />
      <SellerRoute path="/product-list/seller/pageNumber/:pageNumber" component={ProductListScreen} exact />
      <SellerRoute path="/order-list/seller" component={OrderListScreen} />
      <Route path="" component={Screen404} exact />
    </Switch>
  );
}
