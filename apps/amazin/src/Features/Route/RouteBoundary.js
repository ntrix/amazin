import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route as Router, Redirect, Switch } from 'react-router-dom';

import MessageBox from '../../components/MessageBox';

/* TODO send errors report to server using Websocket */
const ErrorFallback = ({ error }) => (
  <div className="home-screen">
    <div className="home__banner home error-page"></div>
    <div>
      <MessageBox variant="danger" msg={error.message} />
      {/* TODO errors report to server using Websocket */}
      {console.error(error.message)}
    </div>
  </div>
);

const Route = (props) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Router {...props} />
  </ErrorBoundary>
);

export { Route, Redirect, Switch };
