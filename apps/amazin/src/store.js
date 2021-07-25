import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

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
import { LOC } from './utils';

const preloadedState = {
  userSignin: { userInfo: LOC._userInfo },
  cart: {
    cartItems: LOC._cartItems || [],
    shippingAddress: LOC._shippingAddress || {},
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
