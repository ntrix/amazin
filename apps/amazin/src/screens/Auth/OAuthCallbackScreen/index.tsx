import { useEffect } from 'react';

import { refreshAccessToken } from 'src/apis/axiosClient';
import LoadingOrError from 'src/components/LoadingOrError';

// Landed on after the backend's OAuth redirect flow (auth/passport.js) sets
// the httpOnly refresh cookie. Mints an access token from it the same way a
// silent 401-triggered refresh does, so the token is never put in the URL.
export default function OAuthCallbackScreen({ history }: RouteProps<MatchParams>) {
  useEffect(() => {
    refreshAccessToken().then((token) => history.push(token ? '/' : '/signin'));
  }, [history]);

  return <LoadingOrError statusOf={{ loading: true }} />;
}
