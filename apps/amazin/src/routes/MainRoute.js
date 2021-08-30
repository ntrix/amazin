import { lazy } from 'react';
import { Route, Switch } from 'src/layouts/SuspenseRoute';
import PrivateRoute from './PrivateRoute';
import SellerRoute from './SellerRoute';
import AdminRoute from './AdminRoute';
import HomeScreen from '../screens/HomeScreen';

const Screen404 = lazy(() => import(/* webpackPrefetch: true */ '../screens/Auth/Screen404'));
const SigninScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Auth/SigninScreen'));
const CurrencyScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/User/CurrencyScreen'));
const DealScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Product/DealScreen'));
const RegisterScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Auth/RegisterScreen'));
const SellerScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Product/SellerScreen'));
const SearchScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Product/SearchScreen'));
const MapScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/User/MapScreen'));
const VideoScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Product/VideoScreen'));
const ProductScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Product/ProductScreen'));
const ContactScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/User/ContactScreen'));
const CustomerScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/User/CustomerScreen'));
const CartScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Checkout/CartScreen'));
const PaymentMethodScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Checkout/PaymentMethodScreen'));
const ShippingAddressScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../screens/Checkout/ShippingAddressScreen')
);
const OrderHistoryScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Order/OrderHistoryScreen'));
const OrderListScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Order/OrderListScreen'));
const OrderSumScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Order/OrderSumScreen'));
const PlaceOrderScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Order/PlaceOrderScreen'));
const ProductEditScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Product/ProductEditScreen'));
const ProductListScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Product/ProductListScreen'));
const ProfileScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/User/ProfileScreen'));
const UserEditScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/User/UserEditScreen'));
const UserListScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/User/UserListScreen'));

export default function MainRoute() {
  return (
    <Switch>
      <Route path="/currency/cType/:cType" component={CurrencyScreen} exact />
      <Route path="/customer" component={CustomerScreen} exact />
      <Route path="/contact" component={ContactScreen} exact />
      <Route path="/contact/subject/:subject" component={ContactScreen} exact />
      <Route path="/video" component={VideoScreen} />
      <Route path="/seller/:id" component={SellerScreen} exact />
      <Route path="/seller/:id/order/:order/pageNumber/:pageNumber" component={SellerScreen} exact />
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
      <Route path="/search/category/:category/order/:order" component={SearchScreen} exact />
      <Route path="/search/category/:category/name/:name" component={SearchScreen} exact />
      <Route
        path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
        component={SearchScreen}
        exact
      />
      <Route path="/deal" component={DealScreen} exact />
      <Route path="/deal/category/:category/order/:order/pageNumber/:pageNumber" component={DealScreen} exact />
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
      <Route path="/banner/:banner" component={HomeScreen} exact />
      <Route path="/" component={HomeScreen} exact />
      <Route component={Screen404} exact />
    </Switch>
  );
}
