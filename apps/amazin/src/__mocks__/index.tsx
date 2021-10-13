import React from 'react';
import { Provider } from 'react-redux';
import mockStore from './store';

export function AppProviders({ children }) {
  return <Provider store={mockStore}>{children}</Provider>;
}
