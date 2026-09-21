import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import OAuthButtons from '../../components/OAuthButtons';

describe('OAuthButtons', () => {
  let originalLocation: Location;

  beforeEach(() => {
    originalLocation = window.location;
    // jsdom doesn't implement real navigation; swap in a plain object we can assert on.
    delete (window as unknown as { location?: Location }).location;
    window.location = { href: '' } as Location;
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  test('navigates to the backend Google OAuth route when clicked', () => {
    render(<OAuthButtons />);

    fireEvent.click(screen.getByRole('button', { name: /continue with google/i }));

    expect(window.location.href).toBe(`${process.env.REACT_APP_BACKEND_URL}/api/users/auth/google`);
  });

  test('navigates to the backend GitHub OAuth route when clicked', () => {
    render(<OAuthButtons />);

    fireEvent.click(screen.getByRole('button', { name: /continue with github/i }));

    expect(window.location.href).toBe(`${process.env.REACT_APP_BACKEND_URL}/api/users/auth/github`);
  });
});
