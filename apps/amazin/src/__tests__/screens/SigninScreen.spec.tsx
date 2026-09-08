import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import SigninScreen from '../../screens/Auth/SigninScreen';
import { rootReducer } from '../../store';
import { signin } from '../../apis/userAPI';
import { updateCurrencyRates } from '../../apis/productAPI';

jest.mock('../../apis/userAPI');
jest.mock('../../apis/productAPI');

const mockedSignin = signin as jest.MockedFunction<typeof signin>;
const mockedUpdateCurrencyRates = updateCurrencyRates as jest.MockedFunction<typeof updateCurrencyRates>;

function renderScreen(preloadedState: Partial<AppState>) {
  const store = configureStore({ reducer: rootReducer, preloadedState, middleware: [thunk] });
  const history = { push: jest.fn() } as unknown as HistoryProp;
  const location = { search: '' } as LocationProp;

  render(
    <Provider store={store}>
      <MemoryRouter>
        <SigninScreen history={history} location={location} match={{ params: {} } as MatchProp} />
      </MemoryRouter>
    </Provider>
  );

  return { history };
}

describe('SigninScreen', () => {
  beforeEach(() => {
    mockedSignin.mockReturnValue((() => undefined) as never);
    mockedUpdateCurrencyRates.mockReturnValue((() => undefined) as never);
  });

  test('does not call signin and shows a validation error for an invalid email', () => {
    renderScreen({ userSignin: {} } as Partial<AppState>);

    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: 'not-an-email' } });
    fireEvent.change(screen.getByLabelText(/^Password/), { target: { value: 'Secret123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockedSignin).not.toHaveBeenCalled();
    expect(screen.getByText(/double check the required/i)).toBeInTheDocument();
  });

  test('calls signin with the entered credentials when the form is valid', () => {
    renderScreen({ userSignin: {} } as Partial<AppState>);

    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: 'ada@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password/), { target: { value: 'Secret123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(mockedSignin).toHaveBeenCalledWith('ada@example.com', 'Secret123');
  });

  test('redirects immediately when a user is already signed in', () => {
    const { history } = renderScreen({
      userSignin: { userInfo: { _id: 'u1', name: 'Ada', email: 'ada@example.com', currency: 'USD' } }
    } as Partial<AppState>);

    expect(history.push).toHaveBeenCalledWith('/');
  });
});
