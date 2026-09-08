import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../test-utils';
import ShippingAddressScreen from '../../screens/Checkout/ShippingAddressScreen';

describe('ShippingAddressScreen', () => {
  test('redirects to /signin when no user is signed in', () => {
    const history = { push: jest.fn() } as unknown as HistoryProp;
    renderWithProviders(<ShippingAddressScreen history={history} match={{ params: {} } as MatchProp} />, {
      preloadedState: { userSignin: {}, cart: { shippingAddress: {} } }
    });

    expect(history.push).toHaveBeenCalledWith('/signin');
  });

  test('pre-fills the address fields from the cart in the store', () => {
    const history = { push: jest.fn() } as unknown as HistoryProp;
    renderWithProviders(<ShippingAddressScreen history={history} match={{ params: {} } as MatchProp} />, {
      preloadedState: {
        userSignin: { userInfo: { _id: 'u1' } },
        cart: { shippingAddress: { fullName: 'Ada Lovelace', address: '1 Infinite Loop', city: 'Cupertino' } }
      }
    });

    expect(screen.getByLabelText(/full name/i)).toHaveValue('Ada Lovelace');
    expect(screen.getByLabelText(/^Address/)).toHaveValue('1 Infinite Loop');
    expect(screen.getByLabelText(/^City/)).toHaveValue('Cupertino');
  });

  test('asks for confirmation, then saves and continues to /payment', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    const history = { push: jest.fn() } as unknown as HistoryProp;
    const { store } = renderWithProviders(<ShippingAddressScreen history={history} match={{ params: {} } as MatchProp} />, {
      preloadedState: {
        userSignin: { userInfo: { _id: 'u1' } },
        cart: { shippingAddress: { fullName: 'Ada Lovelace', address: '1 Infinite Loop', city: 'Cupertino' } }
      }
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(confirmSpy).toHaveBeenCalled();
    expect((store.getState() as AppState).cart.shippingAddress.fullName).toBe('Ada Lovelace');
    expect(history.push).toHaveBeenCalledWith('/payment');
    confirmSpy.mockRestore();
  });

  test('does not continue when the user cancels the confirmation', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);
    const history = { push: jest.fn() } as unknown as HistoryProp;
    renderWithProviders(<ShippingAddressScreen history={history} match={{ params: {} } as MatchProp} />, {
      preloadedState: {
        userSignin: { userInfo: { _id: 'u1' } },
        cart: { shippingAddress: { fullName: 'Ada Lovelace' } }
      }
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(history.push).not.toHaveBeenCalledWith('/payment');
    confirmSpy.mockRestore();
  });

  test('locate on map saves the current address and navigates to /map', () => {
    const history = { push: jest.fn() } as unknown as HistoryProp;
    renderWithProviders(<ShippingAddressScreen history={history} match={{ params: {} } as MatchProp} />, {
      preloadedState: {
        userSignin: { userInfo: { _id: 'u1' } },
        cart: { shippingAddress: { fullName: 'Ada Lovelace' } }
      }
    });

    fireEvent.click(screen.getByRole('button', { name: /locate on map/i }));

    expect(history.push).toHaveBeenCalledWith('/map');
  });
});
