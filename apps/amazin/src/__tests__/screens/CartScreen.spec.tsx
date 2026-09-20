import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../test-utils';
import CartScreen from '../../screens/Checkout/CartScreen';
import axiosClient from '../../apis/axiosClient';

jest.mock('../../apis/axiosClient');
const mockedGet = axiosClient.get as jest.MockedFunction<typeof axiosClient.get>;

const seller = { _id: 's1', seller: { name: 'Acme' } } as never;

const item = (overrides = {}) => ({
  product: 'p1',
  name: 'Widget',
  price: 10,
  image: '/img.png',
  qty: 2,
  countInStock: 5,
  seller,
  ship: 0,
  ...overrides,
});

const props = { match: { params: {} } as MatchProp, location: { search: '' } as never };

describe('CartScreen', () => {
  test('shows an empty-cart message and disables checkout when there are no items', () => {
    renderWithProviders(<CartScreen {...props} />, {
      preloadedState: { cart: { cartItems: [] } as never },
    });

    expect(screen.getByText(/cart is still empty/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /proceed to buy/i })).toBeDisabled();
  });

  test('renders a row for each cart item and enables checkout', () => {
    renderWithProviders(<CartScreen {...props} />, {
      preloadedState: { cart: { cartItems: [item(), item({ product: 'p2', name: 'Gadget' })] } as never },
    });

    expect(screen.getByText('Widget')).toBeInTheDocument();
    expect(screen.getByText('Gadget')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /proceed to buy/i })).not.toBeDisabled();
  });

  test('subtotal sums quantity and price across every item in the cart', () => {
    renderWithProviders(<CartScreen {...props} />, {
      preloadedState: {
        cart: { cartItems: [item({ qty: 2, price: 10 }), item({ product: 'p2', qty: 1, price: 5 })] } as never,
      },
    });

    expect(screen.getByText(/Subtotal \(3 items\)/)).toBeInTheDocument();
  });

  test('deleting an item removes it from the cart', () => {
    const { store } = renderWithProviders(<CartScreen {...props} />, {
      preloadedState: { cart: { cartItems: [item(), item({ product: 'p2', name: 'Gadget' })] } as never },
    });

    fireEvent.click(screen.getAllByRole('button', { name: /delete/i })[0]);

    expect(screen.queryByText('Widget')).not.toBeInTheDocument();
    expect(screen.getByText('Gadget')).toBeInTheDocument();
    expect((store.getState() as AppState).cart.cartItems).toHaveLength(1);
  });

  test('changing the quantity re-fetches the product and updates the stored quantity', async () => {
    mockedGet.mockResolvedValueOnce({
      data: { _id: 'p1', name: 'Widget', price: 10, countInStock: 5, seller, image: '/img.png' },
    } as never);
    const { store } = renderWithProviders(<CartScreen {...props} />, {
      preloadedState: { cart: { cartItems: [item({ qty: 1 })] } as never },
    });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '3' } });
    await screen.findByText('Widget');

    expect(mockedGet).toHaveBeenCalledWith('/api/products/p1');
    expect((store.getState() as AppState).cart.cartItems[0].qty).toBe(3);
  });

  test('surfaces the single-seller error banner from the store', () => {
    renderWithProviders(<CartScreen {...props} />, {
      preloadedState: {
        cart: { cartItems: [item()], error: "Can't Add Item Of Other Supplier" } as never,
      },
    });

    expect(screen.getByText(/Can't Add Item Of Other Supplier/)).toBeInTheDocument();
  });
});
