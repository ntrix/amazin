import { memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route as Router, Redirect, Switch } from 'react-router-dom';

import { SuspenseLoad } from 'src/components/CustomSuspense';
import ErrorScreen from 'src/screens/Auth/ErrorScreen';

function _Route(props) {
  return (
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <div className="col-fill">
        <SuspenseLoad children={<Router {...props} />} />
      </div>
    </ErrorBoundary>
  );
}

const Route = memo(_Route);
export { Route, Redirect, Switch };
