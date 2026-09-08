import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import RegisterScreen from '../../screens/Auth/RegisterScreen';
import { rootReducer } from '../../store';
import { register } from '../../apis/userAPI';

jest.mock('../../apis/userAPI');

const mockedRegister = register as jest.MockedFunction<typeof register>;

function renderScreen(preloadedState: Partial<AppState>) {
  const store = configureStore({ reducer: rootReducer, preloadedState, middleware: [thunk] });
  const history = { push: jest.fn() } as unknown as HistoryProp;
  const location = { search: '' } as LocationProp;

  render(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterScreen history={history} location={location} match={{ params: {} } as MatchProp} />
      </MemoryRouter>
    </Provider>
  );

  return { history };
}

describe('RegisterScreen', () => {
  beforeEach(() => {
    mockedRegister.mockReturnValue((() => undefined) as never);
  });

  test('does not call register and shows a validation error when a field is invalid', () => {
    renderScreen({ userRegister: {} } as Partial<AppState>);

    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: 'not-an-email' } });
    fireEvent.change(screen.getByLabelText(/^Password/), { target: { value: 'Secret123' } });
    fireEvent.change(screen.getByLabelText(/^Confirm Password/), { target: { value: 'Secret123' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(mockedRegister).not.toHaveBeenCalled();
    expect(screen.getByText(/double check the required/i)).toBeInTheDocument();
  });

  test('calls register with all four fields when the form is valid', () => {
    renderScreen({ userRegister: {} } as Partial<AppState>);

    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: 'Ada Lovelace' } });
    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: 'ada@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password/), { target: { value: 'Secret123' } });
    fireEvent.change(screen.getByLabelText(/^Confirm Password/), { target: { value: 'Secret123' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(mockedRegister).toHaveBeenCalledWith('Ada Lovelace', 'ada@example.com', 'Secret123', 'Secret123');
  });

  test('redirects immediately when registration already produced a signed-in user', () => {
    const { history } = renderScreen({ userRegister: { userInfo: { _id: 'u1' } } } as Partial<AppState>);
    expect(history.push).toHaveBeenCalledWith('/');
  });
});
