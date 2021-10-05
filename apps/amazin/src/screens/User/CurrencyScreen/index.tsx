import { useParams } from 'react-router';

import './currencyScreen.css';
import { CurrencyProps, useCurrency } from './useCurrency';
import CurrencySection from 'src/components/User/CurrencyScreen/CurrencySection';
import LanguageSection from 'src/components/User/CurrencyScreen/LanguageSection';

export default function CurrencyScreen() {
  const currencyProps: CurrencyProps = useCurrency(useParams());

  return (
    <div className="c-screen currency">
      <LanguageSection />
      <div className="divider-inner"></div>
      <CurrencySection {...currencyProps} />
    </div>
  );
}
