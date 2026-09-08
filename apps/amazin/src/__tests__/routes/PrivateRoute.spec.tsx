import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import PrivateRoute from '../../routes/PrivateRoute';

function renderRoute(userInfo: unknown) {
  const store = configureStore({ reducer: { userSignin: () => ({ userInfo }) } });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/profile']}>
        <PrivateRoute path="/profile" component={() => <div>Profile page</div>} />
      </MemoryRouter>
    </Provider>
  );
}

describe('PrivateRoute', () => {
  test('renders the target component when a user is signed in', () => {
    renderRoute({ _id: 'u1' });
    expect(screen.getByText('Profile page')).toBeInTheDocument();
  });

  test('redirects to signin with a redirect-back path when no one is signed in', () => {
    renderRoute(undefined);
    expect(screen.queryByText('Profile page')).not.toBeInTheDocument();
  });
});
