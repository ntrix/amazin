import { memo, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route as Router, Redirect, Switch } from 'react-router-dom';
import LoadingBox from 'src/components/LoadingBox';
import ErrorScreen from 'src/screens/Auth/ErrorScreen';

function _Route(props) {
  return (
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <div className="col-fill">
        <Suspense fallback={<LoadingBox />}>
          <Router {...props} />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

const Route = memo(_Route);
export { Route, Redirect, Switch };
