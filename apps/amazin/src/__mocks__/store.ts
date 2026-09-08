import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { Storage } from '../utils';
import { KEY } from '../constants';
import { rootReducer } from '../store';

const preloadedState = {
  cart: {
    paymentMethod: 'Paypal',
    shippingAddress: Storage[KEY.SHIPPING_ADDRESS] || {},
    cartItems: Storage[KEY.CART_ITEMS] || []
  },
  userSignin: { userInfo: Storage[KEY.USER_INFO] }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export default store;
