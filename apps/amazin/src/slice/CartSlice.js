import { createSlice } from './ReduxToolKitClient';

/* also check in backend */
const checkStock = ({ qty, countInStock }, exItem) => ({
  error: qty + exItem.qty > countInStock ? `There are only ${countInStock} products in stock` : '',
  qty: Math.min(qty + exItem.qty, countInStock)
});

const cartUpdate = (cart, item, exItem) => cart.map((ex) => (ex.product === exItem.product ? item : ex));

export const { actions: cartActions, reducer: cartReducer } = createSlice({
  name: 'cart',
  initialState: { cartItems: [] },
  reducers: {
    _ADD_ITEM(state, action) {
      const newItem = action.payload;
      const { cartItems: cart } = state;
      const exItem = cart.find((x) => x.product === newItem.product);
      // updates cart if new item added
      if (!exItem) return { ...state, error: '', cartItems: [...cart, newItem] };

      const { error, qty } = checkStock(newItem, exItem);
      // or just updates quantity if item is already exist in cart
      newItem.qty = qty;
      return { ...state, error, cartItems: cartUpdate(cart, newItem, exItem) };
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
