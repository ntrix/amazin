import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import {
  listProductCategories,
  updateCurrencyRates
} from './Controllers/productActions';
import HeaderNavBelt from './Features/Nav/HeaderNavBelt';
import HeaderNavMain from './Features/Nav/HeaderNavMain';
import MainRoute from './Features/Route/MainRoute';
import { useShadow } from './utils/useShadow';
import { Storage, pipe } from './utils';
import { SHADOW, KEY } from './constants';
import './responsive.css';

const ErrorScreen = React.lazy(() =>
  import(/* webpackPrefetch: true */ './Features/Auth/ErrorScreen')
);
const SidebarMenu = React.lazy(() =>
  import(/* webpackPrefetch: true */ './Features/Nav/SidebarMenu')
);

export default function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const { sessionCurrency } = useSelector((state) => state.currencyType);

  const { shadowOf, setShadowOf } = useShadow();
  const [currency, setCurrency] = useState(userInfo?.currency || pipe.currency);

  useEffect(() => {
    pipe.setCurrency(
      userInfo?.currency ||
        sessionCurrency ||
        Storage[KEY.CURRENCY] ||
        pipe.currency
    );
    setCurrency(pipe.currency);
    dispatch(updateCurrencyRates());
    dispatch(listProductCategories());
  }, [dispatch, userInfo?.currency, sessionCurrency]);

  return (
    <BrowserRouter>
      <div
        className={`container--grid ${
          SHADOW.SIDEBAR === shadowOf ? 'scroll--off' : ''
        }`}
      >
        <ErrorBoundary FallbackComponent={ErrorScreen}>
          <header id="nav-bar">
            <Suspense fallback={<h3>Amazin' Amazim Store</h3>}>
              <HeaderNavBelt currency={currency} />
            </Suspense>

            <Suspense fallback={null}>
              <HeaderNavMain />
            </Suspense>
          </header>

          <Suspense fallback={null}>
            <SidebarMenu currency={currency} />
          </Suspense>
        </ErrorBoundary>

        <main className="container">
          <Suspense fallback={<h3>Loading...</h3>}>
            <MainRoute />
          </Suspense>

          <Suspense fallback={null}>
            <div
              className={`shadow-of__${shadowOf}`}
              onClick={() => setShadowOf('')}
            />
          </Suspense>
        </main>
        <footer className="row center">
          Amazin' eCommerce platform, all right reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}
