import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../test-utils';
import CurrencyScreen from '../../screens/User/CurrencyScreen';
import { updateCurrencyRates } from '../../apis/productAPI';
import { updateUserProfile } from '../../apis/userAPI';

jest.mock('../../apis/productAPI');
jest.mock('../../apis/userAPI');

const mockedUpdateCurrencyRates = updateCurrencyRates as jest.MockedFunction<typeof updateCurrencyRates>;
const mockedUpdateUserProfile = updateUserProfile as jest.MockedFunction<typeof updateUserProfile>;

describe('CurrencyScreen', () => {
  beforeEach(() => {
    mockedUpdateCurrencyRates.mockReturnValue((() => undefined) as never);
    mockedUpdateUserProfile.mockReturnValue((() => undefined) as never);
  });

  test('saving updates the currency rates and shows the success message', () => {
    renderWithProviders(<CurrencyScreen />, { preloadedState: { userSignin: {} } });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(mockedUpdateCurrencyRates).toHaveBeenCalled();
    expect(screen.getByText(/currency has been changed to/i)).toBeInTheDocument();
  });

  test('also updates the signed-in user profile with the new currency', () => {
    renderWithProviders(<CurrencyScreen />, {
      preloadedState: { userSignin: { userInfo: { _id: 'u1', name: 'Ada', email: 'ada@example.com' } } }
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(mockedUpdateUserProfile).toHaveBeenCalledWith(
      expect.objectContaining({ _id: 'u1', name: 'Ada', email: 'ada@example.com' })
    );
  });

  test('does not touch the user profile when no one is signed in', () => {
    renderWithProviders(<CurrencyScreen />, { preloadedState: { userSignin: {} } });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(mockedUpdateUserProfile).not.toHaveBeenCalled();
  });
});
