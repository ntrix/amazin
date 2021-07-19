import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route as Router, Redirect, Switch } from 'react-router-dom';

import ErrorFallback from '../Auth/ErrorFallBack';

const Route = (props) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Router {...props} />
  </ErrorBoundary>
);

export { Route, Redirect, Switch };
