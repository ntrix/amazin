import React from "react";
import { Route } from "react-router-dom";

import RegisterScreen from "../Auth/RegisterScreen";
import SigninScreen from "../Auth/SigninScreen";
import CartScreen from "../Checkout/CartScreen";
import PaymentMethodScreen from "../Checkout/PaymentMethodScreen";
import ShippingAddressScreen from "../Checkout/ShippingAddressScreen";
import HomeScreen from "../HomeScreen";
import OrderHistoryScreen from "../Order/OrderHistoryScreen";
import OrderListScreen from "../Order/OrderListScreen";
import OrderScreen from "../Order/OrderScreen";
import PlaceOrderScreen from "../Order/PlaceOrderScreen";
import ProductEditScreen from "../Product/ProductEditScreen";
import ProductListScreen from "../Product/ProductListScreen";
import ProductScreen from "../Product/ProductScreen";
import SearchScreen from "../Product/SearchScreen";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";
import SellerScreen from "../SellerScreen";
import MapScreen from "../User/MapScreen";
import ProfileScreen from "../User/ProfileScreen";
import UserEditScreen from "../User/UserEditScreen";
import UserListScreen from "../User/UserListScreen";
import ContactScreen from "../User/ContactScreen";
import VideoScreen from "../Product/VideoScreen";
import DealScreen from "../Product/DealScreen";

export default function MainRoute() {
  return (
    <>
      <Route path="/contact" component={ContactScreen} exact></Route>
      <Route
        path="/contact/subject/:subject"
        component={ContactScreen}
        exact
      ></Route>
      <Route path="/video" component={VideoScreen}></Route>
      <Route path="/seller/:id" component={SellerScreen}></Route>
      <Route path="/cart/:id?" component={CartScreen}></Route>
      <Route path="/product/:id" component={ProductScreen} exact></Route>
      <Route
        path="/product/:id/edit"
        component={ProductEditScreen}
        exact
      ></Route>
      <Route path="/signin" component={SigninScreen}></Route>
      <Route path="/register" component={RegisterScreen}></Route>
      <Route path="/shipping" component={ShippingAddressScreen}></Route>
      <Route path="/payment" component={PaymentMethodScreen}></Route>
      <Route path="/place-order" component={PlaceOrderScreen}></Route>
      <Route path="/order/:id" component={OrderScreen}></Route>
      <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
      <Route
        path="/search/category/:category"
        component={SearchScreen}
        exact
      ></Route>
      <Route
        path="/search/category/:category/name/:name"
        component={SearchScreen}
        exact
      ></Route>
      <Route
        path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
        component={SearchScreen}
        exact
      ></Route>
      <Route path="/deal" component={DealScreen} exact></Route>
      <Route
        path="/deal/category/:category/order/:order/pageNumber/:pageNumber"
        component={DealScreen}
        exact
      ></Route>
      <PrivateRoute
        path="/order-history"
        component={OrderHistoryScreen}
      ></PrivateRoute>
      <PrivateRoute
        path="/profile"
        component={ProfileScreen}
        exact
      ></PrivateRoute>
      <PrivateRoute
        path="/profile/seller"
        component={ProfileScreen}
        exact
      ></PrivateRoute>
      <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
      <AdminRoute
        path="/product-list"
        component={ProductListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/product-list/pageNumber/:pageNumber"
        component={ProductListScreen}
        exact
      ></AdminRoute>
      <AdminRoute
        path="/order-list"
        component={OrderListScreen}
        exact
      ></AdminRoute>
      <AdminRoute path="/user-list" component={UserListScreen}></AdminRoute>
      <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
      <SellerRoute
        path="/product-list/seller"
        component={ProductListScreen}
      ></SellerRoute>
      <SellerRoute
        path="/order-list/seller"
        component={OrderListScreen}
      ></SellerRoute>

      <Route path="/" component={HomeScreen} exact></Route>
    </>
  );
}
