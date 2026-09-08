jest.mock('../../apis/axiosClient');

import axiosClient from '../../apis/axiosClient';
import { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod } from '../../apis/cartAPI';
import { cartActions } from '../../slice/CartSlice';
import { Storage } from '../../utils';
import { KEY } from '../../constants';

const mockedGet = axiosClient.get as jest.MockedFunction<typeof axiosClient.get>;

describe('cartAPI', () => {
  test('addToCart adds a new item and persists the cart to storage', async () => {
    mockedGet.mockResolvedValueOnce({
      data: { _id: 'p1', name: 'Widget', price: 10, countInStock: 5, seller: { _id: 's1' } }
    } as never);
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ cart: { cartItems: [] } }));

    await addToCart('p1', 2)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      cartActions._ADD_ITEM(expect.objectContaining({ product: 'p1', qty: 2, name: 'Widget' }))
    );
  });

  test('addToCart rejects adding a product from a different seller than what is already in the cart', async () => {
    mockedGet.mockResolvedValueOnce({
      data: { _id: 'p2', name: 'Gadget', price: 20, countInStock: 5, seller: { _id: 's2' } }
    } as never);
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      cart: { cartItems: [{ product: 'p1', seller: { _id: 's1', seller: { name: 'Acme' } } }] }
    }));

    await addToCart('p2', 1)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(cartActions._ADD_ITEM_FAIL(expect.stringContaining('Acme')));
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test('removeFromCart dispatches the removal and re-persists the cart', () => {
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({ cart: { cartItems: [] } }));

    removeFromCart('p1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(cartActions._REMOVE_ITEM('p1'));
    expect(Storage[KEY.CART_ITEMS]).toEqual([]);
  });

  test('saveShippingAddress dispatches and persists the address', () => {
    const dispatch = jest.fn();
    const address = { fullName: 'Ada', address: '1 Infinite Loop' } as never;

    saveShippingAddress(address)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(cartActions._SAVE_SHIPPING_ADDRESS(address));
    expect(Storage[KEY.SHIPPING_ADDRESS]).toEqual(address);
  });

  test('savePaymentMethod dispatches the chosen payment method', () => {
    const dispatch = jest.fn();

    savePaymentMethod('Paypal' as never)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(cartActions._SAVE_PAYMENT_METHOD('Paypal'));
  });
});
