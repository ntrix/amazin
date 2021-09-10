import { memo, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import './nav.css';
import { SuspenseNull, SuspenseText } from 'src/components/CustomSuspense';
import NavBelt from 'src/components/Nav/NavBelt';
import NavMain from 'src/components/Nav/NavMain';
const ErrorScreen = lazy(() => import(/* webpackPrefetch: true */ 'src/screens/Auth/ErrorScreen'));
const SidebarMenu = lazy(() => import(/* webpackPrefetch: true */ 'src/components/Nav/SidebarMenu'));

function Nav() {
  return (
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <SuspenseText>
        <header id="nav-bar">
          <NavBelt />
          <NavMain />
        </header>
      </SuspenseText>
      <SuspenseNull children={<SidebarMenu />} />
    </ErrorBoundary>
  );
}

export default memo(Nav);
