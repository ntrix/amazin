import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import {
  listProductCategories,
  updateCurrencyRates
} from './Controllers/productActions';
import MainRoute from './Features/Route/MainRoute';
import HeaderNav from './Features/Nav/HeaderNav';
import SidebarMenu from './Features/Nav/SidebarMenu';
import { pipe } from './utils';
import './responsive.css';
import HeaderNavMain from './Features/Nav/HeaderNavMain';
import ErrorFallback from './Features/Auth/ErrorFallBack';

export default function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const { sessionCurrency } = useSelector((state) => state.currencyType);

  const [shadowFor, setShadowFor] = useState('');
  const [currency, setCurrency] = useState(userInfo?.currency || pipe.currency);

  useEffect(() => {
    pipe.setCurrency(
      userInfo?.currency ||
        sessionCurrency ||
        localStorage.getItem('currency') ||
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
          'sidebar' === shadowFor ? 'scroll--off' : ''
        }`}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <header id="nav-bar">
            <HeaderNav
              shadowFor={shadowFor}
              setShadowFor={setShadowFor}
              currency={currency}
            />

            <HeaderNavMain setShadowFor={setShadowFor} />
          </header>

          <SidebarMenu
            shadowFor={shadowFor}
            setShadowFor={setShadowFor}
            currency={currency}
          />

          <label
            className={'sidebar' === shadowFor ? 'click-catcher' : ''}
            htmlFor="btn--close-sidebar"
            aria-label="close sidebar button"
          ></label>
          <main className="container">
            <div className="col-fill">
              <MainRoute />
            </div>

            <div
              className={`underlay-${shadowFor}`}
              onClick={() => setShadowFor('')}
            ></div>
          </main>
        </ErrorBoundary>
        <footer className="row center">
          Amazin' eCommerce platform, all right reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}
