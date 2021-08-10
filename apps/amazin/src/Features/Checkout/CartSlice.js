import { createSlice } from '../../utils/ReduxToolKitClient';

export const { actions: cartActions, reducer: cartReducer } = createSlice({
  name: 'cart',
  initialState: { cartItems: [] },
  reducers: {
    _ADD_ITEM(state, action) {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        const error =
          item.qty + existItem.qty > item.countInStock
            ? `There are only ${item.countInStock} products left in stock`
            : '';
        item.qty = Math.min(item.qty + existItem.qty, item.countInStock);
        return {
          ...state,
          error,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          )
        };
      } else {
        return { ...state, error: '', cartItems: [...state.cartItems, item] };
      }
    },
    _REMOVE_ITEM: (state, action) => ({
      ...state,
      error: '',
      cartItems: state.cartItems.filter((x) => x.product !== action.payload)
    }),
    _SAVE_SHIPPING_ADDRESS: (state, action) => ({
      ...state,
      shippingAddress: action.payload
    }),
    _SAVE_PAYMENT_METHOD: (state, action) => ({
      ...state,
      paymentMethod: action.payload
    }),
    _ADD_ITEM_FAIL: (state, action) => ({
      ...state,
      error: action.payload
    }),
    _EMPTY: (state) => ({ ...state, error: '', cartItems: [] })
  }
});
