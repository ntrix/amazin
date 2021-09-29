import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import '../index.css';
import { SuspenseText } from 'src/components/CustomSuspense';
import { listProductCategories, updateCurrencyRates } from '../apis/productAPI';
import ShadowProvider, { useShadow } from '../hooks/useShadow';
import { SHADOW } from '../constants';
import Nav from './Nav';
import MainRoutes from '../routes/MainRoutes';
import './responsive.css';
import '../fonts/fonts.css';
import '../fonts/font-awesome.css';

function App() {
  const dispatch = useDispatch();
  const { shadowOf } = useShadow();

  useEffect(() => {
    dispatch(updateCurrencyRates());
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <div className={`container--grid ${SHADOW.SIDEBAR === shadowOf ? 'scroll--off' : ''}`}>
      <BrowserRouter>
        <Nav />
        <main className="container">
          <SuspenseText children={<MainRoutes />} />
        </main>
      </BrowserRouter>

      <footer className="row center">Amazin' Amazim Store, eCommerce platform, all right reserved</footer>
    </div>
  );
}

export default function AppWithShadow() {
  return <ShadowProvider children={<App />} />;
}
