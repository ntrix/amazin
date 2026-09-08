import { cartActions, cartReducer } from '../../slice/CartSlice';

const makeItem = (overrides: Partial<ItemType> = {}): ItemType =>
  ({
    _id: 'item-1',
    name: 'Test product',
    qty: 1,
    price: 10,
    countInStock: 5,
    image: '',
    seller: {} as UserType,
    product: 'product-1',
    ship: 0,
    ...overrides
  } as ItemType);

describe('cartReducer - _ADD_ITEM', () => {
  test('appends a new item when it is not already in the cart', () => {
    const state = { cartItems: [] } as Partial<CartType>;
    const newItem = makeItem({ product: 'product-1', qty: 1 });

    const result = cartReducer(state, cartActions._ADD_ITEM(newItem));

    expect(result.cartItems).toEqual([newItem]);
    expect(result.error).toBe('');
  });

  test('merges quantity into the existing item when total stays within stock', () => {
    const existing = makeItem({ product: 'product-1', qty: 2, countInStock: 5 });
    const state = { cartItems: [existing] } as Partial<CartType>;
    const addMore = makeItem({ product: 'product-1', qty: 2, countInStock: 5 });

    const result = cartReducer(state, cartActions._ADD_ITEM(addMore));

    expect(result.cartItems).toHaveLength(1);
    expect(result.cartItems[0].qty).toBe(4);
    expect(result.error).toBe('');
  });

  test('caps the quantity at countInStock and reports an error when the total exceeds stock', () => {
    const existing = makeItem({ product: 'product-1', qty: 3, countInStock: 5 });
    const state = { cartItems: [existing] } as Partial<CartType>;
    const addMore = makeItem({ product: 'product-1', qty: 4, countInStock: 5 });

    const result = cartReducer(state, cartActions._ADD_ITEM(addMore));

    expect(result.cartItems[0].qty).toBe(5);
    expect(result.error).toBe('There are only 5 products in stock');
  });
});

describe('cartReducer - _REMOVE_ITEM', () => {
  test('removes only the targeted product, keeping the rest untouched', () => {
    const itemToRemove = makeItem({ product: 'product-1' });
    const itemToKeep = makeItem({ product: 'product-2' });
    const state = { cartItems: [itemToRemove, itemToKeep] } as Partial<CartType>;

    const result = cartReducer(state, cartActions._REMOVE_ITEM('product-1'));

    expect(result.cartItems).toEqual([itemToKeep]);
  });
});

describe('cartReducer - _EMPTY', () => {
  test('clears all cart items and resets the error', () => {
    const state = {
      cartItems: [makeItem()],
      error: 'some previous error'
    } as Partial<CartType>;

    const result = cartReducer(state, cartActions._EMPTY());

    expect(result.cartItems).toEqual([]);
    expect(result.error).toBe('');
  });
});

describe('cartReducer - _SAVE_PAYMENT_METHOD', () => {
  test('stores the chosen payment method', () => {
    const state = { cartItems: [] } as Partial<CartType>;
    const result = cartReducer(state, cartActions._SAVE_PAYMENT_METHOD('Paypal'));
    expect(result.paymentMethod).toBe('Paypal');
  });
});

describe('cartReducer - _ADD_ITEM_FAIL', () => {
  test('stores the error message without touching the existing cart items', () => {
    const existing = makeItem({ product: 'product-1' });
    const state = { cartItems: [existing] } as Partial<CartType>;

    const result = cartReducer(state, cartActions._ADD_ITEM_FAIL('Out of stock'));

    expect(result.error).toBe('Out of stock');
    expect(result.cartItems).toEqual([existing]);
  });
});
