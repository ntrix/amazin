import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import UserEditScreen from '../../screens/User/UserEditScreen';
import { rootReducer } from '../../store';
import * as userAPI from '../../apis/userAPI';

jest.mock('../../apis/userAPI');

const mockedUserAPI = userAPI as jest.Mocked<typeof userAPI>;

function renderScreen(preloadedState: Partial<AppState>) {
  const store = configureStore({ reducer: rootReducer, preloadedState, middleware: [thunk] });
  const history = { push: jest.fn() } as unknown as HistoryProp;
  const match = { params: { id: 'user-1' } } as MatchProp;

  render(
    <Provider store={store}>
      <UserEditScreen history={history} match={match} />
    </Provider>
  );

  return { history };
}

describe('UserEditScreen', () => {
  beforeEach(() => {
    mockedUserAPI.detailsUser.mockReturnValue((() => undefined) as never);
    mockedUserAPI.updateUser.mockReturnValue((() => undefined) as never);
  });

  test('pre-fills the form from the user already loaded in the store', () => {
    renderScreen({
      userDetails: { user: { _id: 'user-1', name: 'Ada Lovelace', email: 'ada@example.com' } },
      userUpdate: {}
    } as Partial<AppState>);

    expect(screen.getByLabelText(/^Name/)).toHaveValue('Ada Lovelace');
    expect(screen.getByLabelText(/^Email/)).toHaveValue('ada@example.com');
    expect(mockedUserAPI.detailsUser).not.toHaveBeenCalled();
  });

  test('submitting the form dispatches updateUser with the edited values', () => {
    renderScreen({
      userDetails: { user: { _id: 'user-1', name: 'Ada Lovelace', email: 'ada@example.com' } },
      userUpdate: {}
    } as Partial<AppState>);

    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: 'Ada L.' } });
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    expect(mockedUserAPI.updateUser).toHaveBeenCalledWith(
      expect.objectContaining({ _id: 'user-1', name: 'Ada L.', email: 'ada@example.com' })
    );
  });
});
