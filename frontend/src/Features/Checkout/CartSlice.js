import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    CART_ADD_ITEM(state, action) {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          error: "",
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, error: "", cartItems: [...state.cartItems, item] };
      }
    },
    CART_REMOVE_ITEM: (state, action) => ({
      ...state,
      error: "",
      cartItems: state.cartItems.filter((x) => x.product !== action.payload),
    }),
    CART_SAVE_SHIPPING_ADDRESS: (state, action) => ({
      ...state,
      shippingAddress: action.payload,
    }),
    CART_SAVE_PAYMENT_METHOD: (state, action) => ({
      ...state,
      paymentMethod: action.payload,
    }),
    CART_ADD_ITEM_FAIL: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    CART_EMPTY: (state, action) => ({ ...state, error: "", cartItems: [] }),
  },
});

const { actions, reducer } = cartSlice;
export const {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_ITEM_FAIL,
  CART_EMPTY,
} = actions;
export default reducer;
