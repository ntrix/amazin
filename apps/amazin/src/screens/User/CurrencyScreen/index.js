import './currencyScreen.css';
import LanguageSection from './LanguageSection';
import CurrencySection from './CurrencySection';

export default function CurrencyScreen() {
  return (
    <div className="c-screen currency">
      <LanguageSection />
      <div className="divider-inner"></div>
      <CurrencySection />
    </div>
  );
}
