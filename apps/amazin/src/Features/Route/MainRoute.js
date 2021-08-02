import React, { lazy } from 'react';
import { Route, Switch } from './RouteBoundary';
import HomeScreen from '../HomeScreen';
import PrivateRoute from './PrivateRoute';
import SellerRoute from './SellerRoute';
import CurrencyScreen from '../User/CurrencyScreen';

const Screen404 = lazy(() =>
  import(/* webpackPrefetch: true */ '../Auth/Screen404')
);
const SigninScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Auth/SigninScreen')
);
const AdminRoute = lazy(() =>
  import(/* webpackPrefetch: true */ './AdminRoute')
);
const DealScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Product/DealScreen')
);
const RegisterScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Auth/RegisterScreen')
);
const SellerScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Product/SellerScreen')
);
const SearchScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Product/SearchScreen')
);
const MapScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../User/MapScreen')
);
const VideoScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Product/VideoScreen')
);
const ProductScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Product/ProductScreen')
);
const ContactScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../User/ContactScreen')
);
const CustomerScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../User/CustomerScreen')
);
const CartScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Checkout/CartScreen')
);
const PaymentMethodScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Checkout/PaymentMethodScreen')
);
const ShippingAddressScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Checkout/ShippingAddressScreen')
);
const OrderHistoryScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Order/OrderHistoryScreen')
);
const OrderListScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Order/OrderListScreen')
);
const OrderSumScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Order/OrderSumScreen')
);
const PlaceOrderScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Order/PlaceOrderScreen')
);
const ProductEditScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Product/ProductEditScreen')
);
const ProductListScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../Product/ProductListScreen')
);
const ProfileScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../User/ProfileScreen')
);
const UserEditScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../User/UserEditScreen')
);
const UserListScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../User/UserListScreen')
);

export default function MainRoute() {
  return (
    <Switch>
      <Route path="/currency/cType/:cType" component={CurrencyScreen} exact />
      <Route path="/customer" component={CustomerScreen} exact />
      <Route path="/contact" component={ContactScreen} exact />
      <Route path="/contact/subject/:subject" component={ContactScreen} exact />
      <Route path="/video" component={VideoScreen} />
      <Route path="/seller/:id" component={SellerScreen} exact />
      <Route
        path="/seller/:id/order/:order/pageNumber/:pageNumber"
        component={SellerScreen}
        exact
      />
      <Route path="/cart/:id?" component={CartScreen} />
      <Route path="/product/:id" component={ProductScreen} exact />
      <Route path="/product/:id/edit" component={ProductEditScreen} exact />
      <Route path="/signin" component={SigninScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/shipping" component={ShippingAddressScreen} />
      <Route path="/payment" component={PaymentMethodScreen} />
      <Route path="/place-order" component={PlaceOrderScreen} />
      <Route path="/order/:id" component={OrderSumScreen} />
      <Route path="/search/name/:name?" component={SearchScreen} exact />
      <Route path="/search/category/:category" component={SearchScreen} exact />
      <Route
        path="/search/category/:category/order/:order"
        component={SearchScreen}
        exact
      />
      <Route
        path="/search/category/:category/name/:name"
        component={SearchScreen}
        exact
      />
      <Route
        path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
        component={SearchScreen}
        exact
      />
      <Route path="/deal" component={DealScreen} exact />
      <Route
        path="/deal/category/:category/order/:order/pageNumber/:pageNumber"
        component={DealScreen}
        exact
      />
      <PrivateRoute path="/order-history" component={OrderHistoryScreen} />
      <PrivateRoute path="/profile" component={ProfileScreen} />
      <PrivateRoute path="/map" component={MapScreen} />
      <AdminRoute path="/product-list" component={ProductListScreen} exact />
      <AdminRoute
        path="/product-list/pageNumber/:pageNumber"
        component={ProductListScreen}
        exact
      />
      <AdminRoute path="/order-list" component={OrderListScreen} exact />
      <AdminRoute path="/user-list" component={UserListScreen} />
      <AdminRoute path="/user/:id/edit" component={UserEditScreen} />
      <SellerRoute
        path="/product-list/seller"
        component={ProductListScreen}
        exact
      />
      <SellerRoute
        path="/product-list/seller/pageNumber/:pageNumber"
        component={ProductListScreen}
        exact
      />
      <SellerRoute path="/order-list/seller" component={OrderListScreen} />
      <Route path="/banner/:banner" component={HomeScreen} exact />
      <Route path="/" component={HomeScreen} exact />
      <Route component={Screen404} exact />
    </Switch>
  );
}
