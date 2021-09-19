import { lazy } from 'react';

import { Route, Switch } from 'src/routes/SuspenseRoute';
import HomeScreen from '../screens/HomeScreen';
import SearchRoutes from './SearchRoutes';
import TokenRoutes from './TokenRoutes';

const SigninScreen: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Auth/SigninScreen'));
const CurrencyScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/User/CurrencyScreen')
);
const RegisterScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Auth/RegisterScreen')
);
const SellerScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Product/SellerScreen')
);
const VideoScreen: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Product/VideoScreen'));
const ProductScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Product/ProductScreen')
);
const ContactScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/User/ContactScreen')
);
const CustomerScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/User/CustomerScreen')
);
const CartScreen: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Checkout/CartScreen'));
const PaymentMethodScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Checkout/PaymentMethodScreen')
);
const ShippingAddressScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Checkout/ShippingAddressScreen')
);
const OrderSumScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Order/OrderSumScreen')
);
const PlaceOrderScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Order/PlaceOrderScreen')
);
const ProductEditScreen: Lazy = lazy(
  (): LazyPromise => import(/* webpackPrefetch: true */ '../screens/Product/ProductEditScreen')
);

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
      <Route path="/signin" component={SigninScreen} exact />
      <Route path="/register" component={RegisterScreen} exact />
      <Route path="/shipping" component={ShippingAddressScreen} exact />
      <Route path="/payment" component={PaymentMethodScreen} exact />
      <Route path="/place-order" component={PlaceOrderScreen} exact />
      <Route path="/order/:id" component={OrderSumScreen} exact />
      <Route path="/banner/:banner" component={HomeScreen} exact />
      <Route path="/" component={HomeScreen} exact />
      <SearchRoutes />
      <TokenRoutes />
    </Switch>
  );
}
