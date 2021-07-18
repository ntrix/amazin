import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import {
  STORAGE_CART_ITEMS,
  STORAGE_SHIPPING_ADDRESS,
  STORAGE_USERINFO
} from './constants';

import { cartReducer } from './Features/Checkout/CartSlice';
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer
} from './Features/Order/OrderSlice';
import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productListAllReducer,
  productReviewCreateReducer,
  productUpdateReducer,
  currencyTypeReducer
} from './Features/Product/ProductSlice';
import {
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopSellerListReducer,
  userUpdateProfileReducer,
  userUpdateReducer
} from './Features/User/UserSlice.js';

const preloadedState = {
  userSignin: {
    userInfo: localStorage.getItem(STORAGE_USERINFO)
      ? JSON.parse(localStorage.getItem(STORAGE_USERINFO))
      : null
  },

  cart: {
    cartItems: localStorage.getItem(STORAGE_CART_ITEMS)
      ? JSON.parse(localStorage.getItem(STORAGE_CART_ITEMS))
      : [],

    shippingAddress: localStorage.getItem(STORAGE_SHIPPING_ADDRESS)
      ? JSON.parse(localStorage.getItem(STORAGE_SHIPPING_ADDRESS))
      : {},

    paymentMethod: 'PayPal'
  }
};

const store = configureStore({
  preloadedState,
  reducer: {
    currencyType: currencyTypeReducer,
    productList: productListReducer,
    productListAll: productListAllReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userTopSellersList: userTopSellerListReducer,
    productCategoryList: productCategoryListReducer,
    productReviewCreate: productReviewCreateReducer,
    userAddressMap: userAddressMapReducer
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
