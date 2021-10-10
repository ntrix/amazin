import { memo, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import './nav.css';
import './responsive.css';
import { SuspenseNull, SuspenseText } from 'src/components/CustomSuspense';
import OutlineProvider from 'src/components/Nav/NavSearch/useOutline';
import NavShadow from 'src/components/Nav/NavShadow';
const NavBelt: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ 'src/components/Nav/NavBelt'));
const NavMain: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ 'src/components/Nav/NavMain'));
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
      <SuspenseNull>
        <SidebarMenu />
      </SuspenseNull>
    </ErrorBoundary>
  );
}

export default memo(Nav);
