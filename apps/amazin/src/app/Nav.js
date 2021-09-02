import { memo, lazy, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';

import './nav.css';
import { SuspenseNull, SuspenseText } from 'src/components/CustomSuspense';
import { KEY } from 'src/constants';
import { pipe, Storage } from 'src/utils';
import NavBelt from 'src/components/Nav/NavBelt';
import NavMain from 'src/components/Nav/NavMain';
const ErrorScreen = lazy(() => import(/* webpackPrefetch: true */ 'src/screens/Auth/ErrorScreen'));
const SidebarMenu = lazy(() => import(/* webpackPrefetch: true */ 'src/components/Nav/SidebarMenu'));

function Nav() {
  const { userInfo } = useSelector((state) => state.userSignin);
  const { sessionCurrency } = useSelector((state) => state.currencyType);
  const [currency, setCurrency] = useState(userInfo?.currency || pipe.currency);

  useEffect(() => {
    pipe.setCurrency(userInfo?.currency || sessionCurrency || Storage[KEY.CURRENCY] || pipe.currency);
    setCurrency(pipe.currency);
  }, [userInfo?.currency, sessionCurrency]);

  return (
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <SuspenseText>
        <header id="nav-bar">
          <NavBelt currency={currency} />
          <NavMain />
        </header>
      </SuspenseText>
      <SuspenseNull children={<SidebarMenu currency={currency} />} />
    </ErrorBoundary>
  );
}

export default memo(Nav);
