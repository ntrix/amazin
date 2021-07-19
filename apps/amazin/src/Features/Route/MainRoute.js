import React from 'react';
import { Route, Switch } from './RouteBoundary';

import RegisterScreen from '../Auth/RegisterScreen';
import SigninScreen from '../Auth/SigninScreen';
import CartScreen from '../Checkout/CartScreen';
import PaymentMethodScreen from '../Checkout/PaymentMethodScreen';
import ShippingAddressScreen from '../Checkout/ShippingAddressScreen';
import HomeScreen from '../HomeScreen';
import OrderHistoryScreen from '../Order/OrderHistoryScreen';
import OrderListScreen from '../Order/OrderListScreen';
import OrderSumScreen from '../Order/OrderSumScreen';
import PlaceOrderScreen from '../Order/PlaceOrderScreen';
import ProductEditScreen from '../Product/ProductEditScreen';
import ProductListScreen from '../Product/ProductListScreen';
import ProductScreen from '../Product/ProductScreen';
import SearchScreen from '../Product/SearchScreen';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import SellerRoute from './SellerRoute';
import SellerScreen from '../SellerScreen';
import MapScreen from '../User/MapScreen';
import ProfileScreen from '../User/ProfileScreen';
import UserEditScreen from '../User/UserEditScreen';
import UserListScreen from '../User/UserListScreen';
import ContactScreen from '../User/ContactScreen';
import VideoScreen from '../Product/VideoScreen';
import DealScreen from '../Product/DealScreen';
import CustomerScreen from '../User/CustomerScreen';
import CurrencyScreen from '../User/CurrencyScreen';
import Screen404 from '../Auth/Screen404';

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
