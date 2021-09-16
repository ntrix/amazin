import { memo, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import './nav.css';
import { SuspenseNull, SuspenseText } from 'src/components/CustomSuspense';
import { OutlineProvider } from 'src/components/Nav/NavSearch/useOutline';
import NavBelt from 'src/components/Nav/NavBelt';
import NavMain from 'src/components/Nav/NavMain';
import NavShadow from 'src/components/Nav/NavShadow';
const ErrorScreen: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ 'src/screens/Auth/ErrorScreen'));
const SidebarMenu: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ 'src/components/Nav/SidebarMenu'));

function Nav() {
  return (
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <OutlineProvider>
        <header id="nav-bar">
          <SuspenseText>
            <NavBelt />
            <NavMain />
          </SuspenseText>
        </header>
        <NavShadow />
      </OutlineProvider>
      <SuspenseNull children={<SidebarMenu />} />
    </ErrorBoundary>
  );
}

export default memo(Nav);
