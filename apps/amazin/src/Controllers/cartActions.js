import axiosClient from './axiosClient';
import { cartActions } from '../Features/Checkout/CartSlice.js';
import { STORAGE_CART_ITEMS, STORAGE_SHIPPING_ADDRESS } from '../constants';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axiosClient.get(`/api/products/${productId}`);
  const { cart } = getState();
  const { cartItems } = cart;

  if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
    dispatch(
      cartActions._ADD_ITEM_FAIL(
        `Can't Add Item Of Other Supplier. Buy Only From The Same Seller (${
          cartItems[0].seller.seller.name || 'Anonymous Seller'
        }) in this order`
      )
    );
  } else {
    dispatch(
      cartActions._ADD_ITEM({
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        ship: data.ship,
        deal: data.deal,
        seller: data.seller,
        qty
      })
    );

    localStorage.setItem(
      STORAGE_CART_ITEMS,
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch(cartActions._REMOVE_ITEM(productId));
  localStorage.setItem(
    STORAGE_CART_ITEMS,
    JSON.stringify(getState().cart.cartItems)
  );
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(cartActions._SAVE_SHIPPING_ADDRESS(data));
  localStorage.setItem(STORAGE_SHIPPING_ADDRESS, JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(cartActions._SAVE_PAYMENT_METHOD(data));
};
