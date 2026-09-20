import React from 'react';
import { screen, fireEvent, within } from '@testing-library/react';

import { renderWithProviders } from '../../test-utils';
import PlaceOrderScreen from '../../screens/Order/PlaceOrderScreen';
import { createOrder } from '../../apis/orderAPI';

jest.mock('../../apis/orderAPI');
const mockedCreateOrder = createOrder as jest.MockedFunction<typeof createOrder>;

const cartItem = (overrides = {}) => ({
  product: 'p1',
  name: 'Widget',
  price: 10,
  image: '/img.png',
  qty: 1,
  countInStock: 5,
  ship: 5,
  ...overrides,
});

const baseCart = (overrides = {}) => ({
  cartItems: [cartItem()],
  paymentMethod: 'PayPal',
  shippingAddress: {
    fullName: 'Ada',
    address: '1 Infinite Loop',
    city: 'Cupertino',
    postalCode: '95014',
    country: 'USA',
  },
  ...overrides,
});

describe('PlaceOrderScreen', () => {
  beforeEach(() => {
    mockedCreateOrder.mockReturnValue((() => undefined) as never);
  });

  test('redirects to /payment when no payment method has been chosen', () => {
    const history = { push: jest.fn() } as unknown as HistoryProp;
    renderWithProviders(<PlaceOrderScreen history={history} match={{ params: {} } as MatchProp} />, {
      preloadedState: { cart: baseCart({ paymentMethod: '' }) as never, orderCreate: {} as never },
    });

    expect(history.push).toHaveBeenCalledWith('/payment');
  });

  test('ships free and shows the correct total once the cart exceeds 100', () => {
    const history = { push: jest.fn() } as unknown as HistoryProp;
    renderWithProviders(<PlaceOrderScreen history={history} match={{ params: {} } as MatchProp} />, {
      preloadedState: {
        cart: baseCart({ cartItems: [cartItem({ price: 150, qty: 1, ship: 20 })] }) as never,
        orderCreate: {} as never,
      },
    });

    const summary = screen.getByText('Order Summary').closest('li') as HTMLElement;
    expect(
      within(summary)
        .getByText(/Shipping/)
        .closest('li')
    ).toHaveTextContent(/\D0(\D|$)/);
  });

  test('charges the highest per-item shipping price when the cart is under the free-shipping threshold', () => {
    const history = { push: jest.fn() } as unknown as HistoryProp;
    renderWithProviders(<PlaceOrderScreen history={history} match={{ params: {} } as MatchProp} />, {
      preloadedState: {
        cart: baseCart({
          cartItems: [cartItem({ price: 10, ship: 5 }), cartItem({ product: 'p2', price: 10, ship: 15 })],
        }) as never,
        orderCreate: {} as never,
      },
    });

    const summary = screen.getByText('Order Summary').closest('li') as HTMLElement;
    expect(
      within(summary)
        .getByText(/Shipping/)
        .closest('li')
    ).toHaveTextContent('15');
  });

  test('placing the order submits the current cart', () => {
    const history = { push: jest.fn() } as unknown as HistoryProp;
    renderWithProviders(<PlaceOrderScreen history={history} match={{ params: {} } as MatchProp} />, {
      preloadedState: { cart: baseCart() as never, orderCreate: {} as never },
    });

    fireEvent.click(screen.getByRole('button', { name: /place order/i }));

    expect(mockedCreateOrder).toHaveBeenCalledWith(
      expect.objectContaining({ paymentMethod: 'PayPal', orderItems: expect.any(Array) })
    );
  });

  test('redirects to the order confirmation once the order has been created', () => {
    const history = { push: jest.fn() } as unknown as HistoryProp;
    renderWithProviders(<PlaceOrderScreen history={history} match={{ params: {} } as MatchProp} />, {
      preloadedState: {
        cart: baseCart() as never,
        orderCreate: { success: true, order: { _id: 'o1' } } as never,
      },
    });

    expect(history.push).toHaveBeenCalledWith('/order/o1');
  });
});
