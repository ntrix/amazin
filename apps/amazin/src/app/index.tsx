import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './app.css';
import 'src/assets/fonts/fonts.css';
import 'src/assets/fonts/font-awesome.css';
import { SuspenseText } from 'src/components/CustomSuspense';
import { listProductCategories, updateCurrencyRates } from '../apis/productAPI';
import { SHADOW } from 'src/constants';
import ShadowProvider, { useShadow } from 'src/hooks/useShadow';
import Nav from 'src/components/Nav';
import MainRoutes from 'src/routes/MainRoutes';

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
  return (
    <ShadowProvider>
      <App />
    </ShadowProvider>
  );
}
