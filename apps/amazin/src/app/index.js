import { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import '../index.css';
import { SuspenseNull, SuspenseText } from 'src/components/CustomSuspense';
import { listProductCategories, updateCurrencyRates } from '../apis/productAPI';
import { ShadowProvider, useShadow } from '../hooks/useShadow';
import { Storage, pipe } from '../utils';
import { SHADOW, KEY } from '../constants';
import MainRoutes from '../routes/MainRoutes';
import './responsive.css';
import '../fonts/fonts.css';
import '../fonts/font-awesome.css';
import Nav from 'src/components/Nav';
const ErrorScreen = lazy(() => import(/* webpackPrefetch: true */ '../screens/Auth/ErrorScreen'));
const SidebarMenu = lazy(() => import(/* webpackPrefetch: true */ '../components/Nav/SidebarMenu'));

function App() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const { sessionCurrency } = useSelector((state) => state.currencyType);

  const { shadowOf, setShadowOf } = useShadow();
  const [currency, setCurrency] = useState(userInfo?.currency || pipe.currency);

  useEffect(() => {
    /* TODO clean up currency, extract to redux or context pattern */
    pipe.setCurrency(userInfo?.currency || sessionCurrency || Storage[KEY.CURRENCY] || pipe.currency);
    setCurrency(pipe.currency);
    dispatch(updateCurrencyRates());
    dispatch(listProductCategories());
  }, [dispatch, userInfo?.currency, sessionCurrency]);

  return (
    <div className={`container--grid ${SHADOW.SIDEBAR === shadowOf ? 'scroll--off' : ''}`}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorScreen}>
          <SuspenseText children={<Nav currency={currency} />} />
          <SuspenseNull children={<SidebarMenu currency={currency} />} />
        </ErrorBoundary>

        <main className="container">
          <SuspenseText children={<MainRoutes />} />
          <div className={`shadow-of__${shadowOf}`} onClick={() => setShadowOf('')} />
        </main>
      </BrowserRouter>
      <footer className="row center">Amazin' Amazim Store, eCommerce platform, all right reserved</footer>
    </div>
  );
}

export default function AppWithShadow() {
  return <ShadowProvider children={<App />} />;
}
