import { adapter, createSlice } from './ReduxToolKitClient';

/* also check qty in backend (countInStock) */
const checkStock = ({ qty, countInStock }: ItemType, exItem: ItemType) => ({
  error: qty + exItem.qty > countInStock ? `There are only ${countInStock} products in stock` : '',
  qty: Math.min(qty + exItem.qty, countInStock)
});

const updateItems = (cart: CartType, item: ItemType, exItem: ItemType) =>
  cart.map((ex) => (ex.product === exItem.product ? item : ex));

export const { actions: cartActions, reducer: cartReducer } = createSlice(
  adapter(
    'cart',
    { cartItems: [] },
    {
      _ADD_ITEM(state: AppState, action: SliceAction) {
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
      _REMOVE_ITEM: (state: AppState, action: SliceAction) => ({
        ...state,
        error: '',
        cartItems: state.cartItems.filter((x) => x.product !== action.payload)
      }),
      _SAVE_SHIPPING_ADDRESS: (state: AppState, action: SliceAction) => ({
        ...state,
        shippingAddress: action.payload
      }),
      _SAVE_PAYMENT_METHOD: (state: AppState, action: SliceAction) => ({
        ...state,
        paymentMethod: action.payload
      }),
      _ADD_ITEM_FAIL: (state: AppState, action: SliceAction) => ({
        ...state,
        error: action.payload
      }),
      _EMPTY: (state: AppState) => ({ ...state, error: '', cartItems: [] })
    }
  )
);
