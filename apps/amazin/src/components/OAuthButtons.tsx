const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Full-page navigations on purpose - these hand off to the backend's OAuth
// redirect flow (auth/passport.js), not a client-side route, so a
// react-router Link (SPA navigation) would be wrong here. Plain <button>s
// (not Button.tsx, which always renders a Link for `to`) so app.css's
// tag-selector button styling applies without a special case.
export default function OAuthButtons() {
  return (
    <div className="mt-1 mb-2">
      <button
        className="primary col-fill mt-1 mb-2"
        type="button"
        onClick={() => (window.location.href = `${BACKEND_URL}/api/users/auth/google`)}
      >
        Continue with Google
      </button>
      <button
        className="primary col-fill mt-1 mb-2"
        type="button"
        onClick={() => (window.location.href = `${BACKEND_URL}/api/users/auth/github`)}
      >
        Continue with GitHub
      </button>
    </div>
  );
}
