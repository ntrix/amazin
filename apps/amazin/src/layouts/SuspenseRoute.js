import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route as Router, Redirect, Switch } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';

import ErrorScreen from '../screens/Auth/ErrorScreen';

const Route = (props) => (
  <ErrorBoundary FallbackComponent={ErrorScreen}>
    <div className="col-fill">
      <Suspense fallback={<LoadingBox />}>
        <Router {...props} />
      </Suspense>
    </div>
  </ErrorBoundary>
);

export { Route, Redirect, Switch };
