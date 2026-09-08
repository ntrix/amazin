import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { rootReducer } from '../store';
import ShadowProvider from '../hooks/useShadow';

type Options = {
  preloadedState?: Partial<AppState>;
  route?: string;
  withShadow?: boolean;
};

export function renderWithProviders(ui: React.ReactElement, { preloadedState = {}, route = '/', withShadow = true }: Options = {}) {
  const store = configureStore({ reducer: rootReducer, preloadedState, middleware: [thunk] });
  const tree = withShadow ? <ShadowProvider>{ui}</ShadowProvider> : ui;

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{tree}</MemoryRouter>
      </Provider>
    )
  };
}
