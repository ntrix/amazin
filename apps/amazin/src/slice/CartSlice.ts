import { RootState } from 'src/store';
import { adapter, createSlice } from './ReduxToolKitClient';

/* also check qty in backend (countInStock) */
const checkStock = ({ qty, countInStock }, exItem) => ({
  error: qty + exItem.qty > countInStock ? `There are only ${countInStock} products in stock` : '',
  qty: Math.min(qty + exItem.qty, countInStock)
});

const updateItems = (cart: CartType, item, exItem) => cart.map((ex) => (ex.product === exItem.product ? item : ex));

export const { actions: cartActions, reducer: cartReducer } = createSlice(
  adapter(
    'cart',
    { cartItems: [] },
    {
      _ADD_ITEM(state, action) {
        const newItem = action.payload;
        const { cartItems } = state;
        const exItem = cartItems.find((x: ItemType) => x.product === newItem.product);
        // updates cartItems if new item added
        if (!exItem) return { ...state, error: '', cartItems: [...cartItems, newItem] };

        const { error, qty } = checkStock(newItem, exItem);
        // or just updates quantity if item is already exist in cartItems
        newItem.qty = qty;
        return { ...state, error, cartItems: updateItems(cartItems, newItem, exItem) };
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
  )
);
