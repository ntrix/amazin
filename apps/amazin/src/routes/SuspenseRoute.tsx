import { ErrorBoundary } from 'react-error-boundary';
import { Route as Router, Redirect, Switch } from 'react-router-dom';

import { SuspenseLoad } from 'src/components/CustomSuspense';
import ErrorScreen from 'src/screens/Auth/ErrorScreen';
import Sentry from 'src/utils/sentry';

function Route(props: RouterProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorScreen} onError={(error) => Sentry.captureException(error)}>
      <div className="col-fill">
        <SuspenseLoad children={<Router {...props} />} />
      </div>
    </ErrorBoundary>
  );
}

export { Route, Redirect, Switch };
