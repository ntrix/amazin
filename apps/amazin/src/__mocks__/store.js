import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { KEY } from '../constants';
import { cartReducer } from '../slice/CartSlice';
import { Storage } from '../utils';
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer
} from '../slice/OrderSlice';
import {
  currencyTypeReducer,
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListAllReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer
} from '../slice/ProductSlice';
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
} from '../slice/UserSlice.js';

const preloadedState = {
  userSignin: { userInfo: Storage[KEY.USER_INFO] },
  cart: {
    cartItems: Storage[KEY.CART_ITEMS] || [],
    shippingAddress: Storage[KEY.SHIPPING_ADDRESS] || {},
    paymentMethod: 'PayPal'
  }
};

const store = configureStore({
  preloadedState,
  reducer: {
    userAddressMap: userAddressMapReducer,
    productReviewCreate: productReviewCreateReducer,
    productCategoryList: productCategoryListReducer,
    userTopSellersList: userTopSellerListReducer,
    userDelete: userDeleteReducer,
    userList: userListReducer,
    orderDeliver: orderDeliverReducer,
    orderDelete: orderDeleteReducer,
    orderList: orderListReducer,
    productDelete: productDeleteReducer,
    productUpdate: productUpdateReducer,
    productCreate: productCreateReducer,
    userUpdate: userUpdateReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDetails: userDetailsReducer,
    orderMineList: orderMineListReducer,
    orderPay: orderPayReducer,
    orderDetails: orderDetailsReducer,
    orderCreate: orderCreateReducer,
    userRegister: userRegisterReducer,
    userSignin: userSigninReducer,
    cart: cartReducer,
    productDetails: productDetailsReducer,
    productListAll: productListAllReducer,
    productList: productListReducer,
    currencyType: currencyTypeReducer
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
