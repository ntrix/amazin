import axiosClient from './axiosClient';
import { cartActions } from '../slice/CartSlice';
import { KEY, DUMMY_SELLER } from '../constants';
import { Storage } from '../utils';

export const addToCart = (productId: string, qty: number) => async (dispatch: AppDispatch, getState: FnType) => {
  const { data } = await axiosClient.get(`/api/products/${productId}`);
  const { cart }: CartDetailType = getState();
  const { cartItems } = cart;

  if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
    dispatch(
      cartActions._ADD_ITEM_FAIL(
        `Can't Add Item Of Other Supplier. Buy Only From The Same Seller (${
          cartItems[0].seller.seller?.name || DUMMY_SELLER.seller?.name
        }) in this order`
      )
    );
    return;
  }
  const { _id: product, ...rest } = data;
  // product (_id), name, image, price, countInStock, ship, deal, seller, qty
  dispatch(cartActions._ADD_ITEM({ product, qty, ...rest }));
  Storage[KEY.CART_ITEMS] = getState().cart.cartItems;
};

export const removeFromCart = (productId: string) => (dispatch: AppDispatch, getState: FnType) => {
  dispatch(cartActions._REMOVE_ITEM(productId));
  Storage[KEY.CART_ITEMS] = getState().cart.cartItems;
};

export const saveShippingAddress = (data: AddressType) => (dispatch: AppDispatch) => {
  dispatch(cartActions._SAVE_SHIPPING_ADDRESS(data));
  Storage[KEY.SHIPPING_ADDRESS] = data;
};

export const savePaymentMethod = (data: PaymentMethodType) => (dispatch: AppDispatch) => {
  dispatch(cartActions._SAVE_PAYMENT_METHOD(data));
};
