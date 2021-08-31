import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import '../index.css';
import { listProductCategories, updateCurrencyRates } from '../apis/productAPI';
import { ShadowProvider, useShadow } from '../hooks/useShadow';
import { Storage, pipe } from '../utils';
import { SHADOW, KEY } from '../constants';
import MainRoutes from '../routes/MainRoutes';
import './responsive.css';
import '../fonts/fonts.css';
import '../fonts/font-awesome.css';
import Nav from 'src/components/Nav';
const ErrorScreen = React.lazy(() => import(/* webpackPrefetch: true */ '../screens/Auth/ErrorScreen'));
const SidebarMenu = React.lazy(() => import(/* webpackPrefetch: true */ '../components/Nav/SidebarMenu'));

function InnerApp() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const { sessionCurrency } = useSelector((state) => state.currencyType);

  const { shadowOf, setShadowOf } = useShadow();
  const [currency, setCurrency] = useState(userInfo?.currency || pipe.currency);

  useEffect(() => {
    pipe.setCurrency(userInfo?.currency || sessionCurrency || Storage[KEY.CURRENCY] || pipe.currency);
    setCurrency(pipe.currency);
    dispatch(updateCurrencyRates());
    dispatch(listProductCategories());
  }, [dispatch, userInfo?.currency, sessionCurrency]);

  return (
    <BrowserRouter>
      <div className={`container--grid ${SHADOW.SIDEBAR === shadowOf ? 'scroll--off' : ''}`}>
        <ErrorBoundary FallbackComponent={ErrorScreen}>
          <Suspense fallback={<h3>Amazin' Amazim Store</h3>}>
            <Nav currency={currency} />
          </Suspense>

          <Suspense fallback={null}>
            <SidebarMenu currency={currency} />
          </Suspense>
        </ErrorBoundary>

        <main className="container">
          <Suspense fallback={<h3>Loading...</h3>}>
            <MainRoutes />
          </Suspense>

          <div className={`shadow-of__${shadowOf}`} onClick={() => setShadowOf('')} />
        </main>
        <footer className="row center">Amazin' eCommerce platform, all right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ShadowProvider>
      <InnerApp />
    </ShadowProvider>
  );
}
