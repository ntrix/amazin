import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { AppProviders } from '../mock';
import userEvent from '@testing-library/user-event';
import('@testing-library/jest-dom/extend-expect');

test('renders mock App', () => {
  render(<App />, { wrapper: AppProviders });
  // screen.debug();
});

test('renders app and check some important components', async () => {
  render(<App />, { wrapper: AppProviders });
  expect(screen.getByAltText(/logo amazin/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/address locator/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/category search/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/search input/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/go/i)).toBeInTheDocument();
  expect(screen.queryByDisplayValue(/sign in.*/i)).not.toBeInTheDocument();
  // expect(screen.queryByRole('sup', { name: /.*ads.*/i })).toBeInTheDocument();
  expect(screen.queryByRole('main')).toBeInTheDocument();
});
