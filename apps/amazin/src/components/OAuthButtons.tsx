import { CSSProperties } from 'react';

import GoogleLogo from 'src/assets/img/google.svg';
import GitHubLogo from 'src/assets/img/github.svg';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const rowStyle: CSSProperties = {
  display: 'flex',
  gap: '0.75rem',
  flexWrap: 'wrap',
};

const baseButtonStyle: CSSProperties = {
  flex: '1 1 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.625rem',
  minWidth: '10rem',
  padding: '0.6rem 0.75rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  borderRadius: '0.25rem',
};

// Colors/layout follow each provider's own brand guidelines for
// "Sign in with X" buttons - not app.css's .primary styling, so these
// aren't mistaken for the form's own submit button.
const googleButtonStyle: CSSProperties = {
  ...baseButtonStyle,
  background: '#fff',
  color: '#3c4043',
  border: '1px solid #dadce0',
};

const githubButtonStyle: CSSProperties = {
  ...baseButtonStyle,
  background: '#24292f',
  color: '#fff',
  border: '1px solid #24292f',
  borderRadius: '0.375rem',
};

// Full-page navigations on purpose - these hand off to the backend's OAuth
// redirect flow (auth/passport.js), not a client-side route, so a
// react-router Link (SPA navigation) would be wrong here. Plain <button>s
// (not Button.tsx, which always renders a Link for `to`) with brand colors
// set inline so app.css's global button styling doesn't leak in.
export default function OAuthButtons() {
  return (
    <div className="mt-1 mb-2" style={rowStyle}>
      <button
        type="button"
        style={googleButtonStyle}
        onClick={() => (window.location.href = `${BACKEND_URL}/api/users/auth/google`)}
      >
        <img src={GoogleLogo} alt="" width={18} height={18} />
        Continue with Google
      </button>
      <button
        type="button"
        style={githubButtonStyle}
        onClick={() => (window.location.href = `${BACKEND_URL}/api/users/auth/github`)}
      >
        <img src={GitHubLogo} alt="" width={18} height={18} />
        Continue with GitHub
      </button>
    </div>
  );
}
