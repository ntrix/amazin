import React from 'react';
import { render, waitFor } from '@testing-library/react';

import OAuthCallbackScreen from '../../screens/Auth/OAuthCallbackScreen';
import { refreshAccessToken } from '../../apis/axiosClient';

jest.mock('../../apis/axiosClient');

const mockedRefreshAccessToken = refreshAccessToken as jest.MockedFunction<typeof refreshAccessToken>;

function renderScreen() {
  const history = { push: jest.fn() } as unknown as HistoryProp;
  render(<OAuthCallbackScreen history={history} location={{} as LocationProp} match={{ params: {} } as MatchProp} />);
  return { history };
}

describe('OAuthCallbackScreen', () => {
  test('redirects home once the access token is minted from the refresh cookie', async () => {
    mockedRefreshAccessToken.mockResolvedValue('a-new-access-token');

    const { history } = renderScreen();

    await waitFor(() => expect(history.push).toHaveBeenCalledWith('/'));
  });

  test('redirects to sign in if the refresh cookie was invalid', async () => {
    mockedRefreshAccessToken.mockResolvedValue(null);

    const { history } = renderScreen();

    await waitFor(() => expect(history.push).toHaveBeenCalledWith('/signin'));
  });
});
