import { SliceCaseReducers } from '@reduxjs/toolkit';
import { adapter, createSlice } from './ReduxToolKitClient';

/* also check qty in backend (countInStock) */
const checkStock = ({ qty, countInStock }: ItemType, exItem: ItemType) => ({
  error: qty + exItem.qty > countInStock ? `There are only ${countInStock} products in stock` : '',
  qty: Math.min(qty + exItem.qty, countInStock)
});

const updateItems = (cart: ItemType[], item: ItemType, exItem: ItemType) =>
  cart.map((ex) => (ex.product === exItem.product ? item : ex));

export const createReducers: FnType = () =>
  ({
    _ADD_ITEM(state: CartType, action: SliceAction) {
      const newItem: ItemType = action.payload;
      const { cartItems } = state;
      const exItem = cartItems.find((x: ItemType) => x.product._id === newItem.product._id);
      // updates cartItems if new item added
      if (!exItem) return { ...state, error: '', cartItems: [...cartItems, newItem] };

      const { error, qty } = checkStock(newItem, exItem);
      // or just updates quantity if item is already exist in cartItems
      newItem.qty = qty;
      return { ...state, error, cartItems: updateItems(cartItems, newItem, exItem) };
    },
    _REMOVE_ITEM: (state: CartType, action: SliceAction) => ({
      ...state,
      error: '',
      cartItems: state.cartItems.filter((x: ItemType) => x.product !== action.payload)
    }),
    _SAVE_SHIPPING_ADDRESS: (state: CartType, action: SliceAction) => ({
      ...state,
      shippingAddress: action.payload
    }),
    _SAVE_PAYMENT_METHOD: (state: CartType, action: SliceAction) => ({
      ...state,
      paymentMethod: action.payload
    }),
    _ADD_ITEM_FAIL: (state: CartType, action: SliceAction) => ({
      ...state,
      error: action.payload
    }),
    _EMPTY: (state: CartType) => ({ ...state, error: '', cartItems: [] })
  } as SliceCaseReducers<unknown>);

export const { actions: cartActions, reducer: cartReducer } = createSlice(
  adapter('cart', { cartItems: [] } as Partial<CartType>, createReducers())
);
