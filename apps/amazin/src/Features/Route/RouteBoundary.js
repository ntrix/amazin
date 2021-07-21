import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route as Router, Redirect, Switch } from 'react-router-dom';

import ErrorScreen from '../Auth/ErrorScreen';

const Route = (props) => (
  <ErrorBoundary FallbackComponent={ErrorScreen}>
    <div className="col-fill">
      <Router {...props} />
    </div>
  </ErrorBoundary>
);

export { Route, Redirect, Switch };
