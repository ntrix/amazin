import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import SellerRoute from '../../routes/SellerRoute';
import AdminRoute from '../../routes/AdminRoute';

function renderRoute(Component: typeof SellerRoute | typeof AdminRoute, userInfo: unknown) {
  const store = configureStore({ reducer: { userSignin: () => ({ userInfo }) } });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/product-list/seller']}>
        <Component path="/product-list/seller" component={() => <div>Seller page</div>} />
      </MemoryRouter>
    </Provider>
  );
}

describe('SellerRoute', () => {
  test('renders the target component for a seller account', () => {
    renderRoute(SellerRoute, { isSeller: true });
    expect(screen.getByText('Seller page')).toBeInTheDocument();
  });

  test('redirects a non-seller account to signin', () => {
    renderRoute(SellerRoute, { isSeller: false });
    expect(screen.queryByText('Seller page')).not.toBeInTheDocument();
  });
});

describe('AdminRoute', () => {
  test('renders the target component for an admin account', () => {
    renderRoute(AdminRoute, { isAdmin: true });
    expect(screen.getByText('Seller page')).toBeInTheDocument();
  });

  test('redirects a non-admin account to signin', () => {
    renderRoute(AdminRoute, { isAdmin: false });
    expect(screen.queryByText('Seller page')).not.toBeInTheDocument();
  });
});
