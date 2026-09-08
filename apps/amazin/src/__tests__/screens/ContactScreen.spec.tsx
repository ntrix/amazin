import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import { renderWithProviders } from '../../test-utils';
import ContactScreen from '../../screens/User/ContactScreen';
import { sendContactMessage } from '../../apis/userAPI';

jest.mock('../../apis/userAPI');

const mockedSendContactMessage = sendContactMessage as jest.MockedFunction<typeof sendContactMessage>;

describe('ContactScreen', () => {
  beforeEach(() => {
    mockedSendContactMessage.mockReturnValue((() => undefined) as never);
  });

  test('pre-fills name and email from the signed-in user', () => {
    renderWithProviders(<ContactScreen />, {
      preloadedState: { userSignin: { userInfo: { name: 'Ada Lovelace', email: 'ada@example.com' } } }
    });

    expect(screen.getByLabelText(/your name/i)).toHaveValue('Ada Lovelace');
    expect(screen.getByLabelText(/^Email/)).toHaveValue('ada@example.com');
  });

  test('shows a validation error and does not send when the message is missing', () => {
    renderWithProviders(<ContactScreen />, {
      preloadedState: { userSignin: { userInfo: { name: 'Ada Lovelace', email: 'ada@example.com' } } }
    });

    fireEvent.click(screen.getByRole('button', { name: /send your message/i }));

    expect(mockedSendContactMessage).not.toHaveBeenCalled();
    expect(screen.getByText(/double check the required/i)).toBeInTheDocument();
  });

  test('sends the contact message with the filled-in fields', () => {
    renderWithProviders(<ContactScreen />, {
      preloadedState: { userSignin: { userInfo: { name: 'Ada Lovelace', email: 'ada@example.com' } } }
    });

    fireEvent.change(screen.getByLabelText(/^Your Message/), { target: { value: 'Hello, I need help with my order.' } });
    fireEvent.click(screen.getByRole('button', { name: /send your message/i }));

    expect(mockedSendContactMessage).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Ada Lovelace', email: 'ada@example.com', message: 'Hello, I need help with my order.' }),
      expect.any(Function)
    );
  });
});
