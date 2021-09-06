import { lazy } from 'react';

import { Route, Switch } from 'src/routes/SuspenseRoute';
import HomeScreen from '../screens/HomeScreen';
import TokenRoutes from './TokenRoutes';

const SigninScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Auth/SigninScreen'));
const CurrencyScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/User/CurrencyScreen'));
const DealScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Product/DealScreen'));
const RegisterScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Auth/RegisterScreen'));
const SellerScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Product/SellerScreen'));
const SearchScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Product/SearchScreen'));
const VideoScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Product/VideoScreen'));
const ProductScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Product/ProductScreen'));
const ContactScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/User/ContactScreen'));
const CustomerScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/User/CustomerScreen'));
const CartScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Checkout/CartScreen'));
const PaymentMethodScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Checkout/PaymentMethodScreen'));
const ShippingAddressScreen = lazy(() =>
  import(/* webpackPrefetch: true */ '../screens/Checkout/ShippingAddressScreen')
);
const OrderSumScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Order/OrderSumScreen'));
const PlaceOrderScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Order/PlaceOrderScreen'));
const ProductEditScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Product/ProductEditScreen'));

export default function MainRoutes() {
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
      <Route path="/banner/:banner" component={HomeScreen} exact />
      <Route path="/" component={HomeScreen} exact />
      <TokenRoutes />
    </Switch>
  );
}
