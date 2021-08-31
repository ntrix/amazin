import { pipe } from 'src/utils';
import { useCurrency } from './useCurrency';
import Button from 'src/components/Button';
import CurrencyOptions from './CurrencyOptions';
import SuccessModal from 'src/components/SuccessModal';

export default function CurrencySection() {
  const { CURR, back, currency, setCurrency, changedCurrency, submitChange } = useCurrency();
  return (
    <>
      <div className="container currencies">
        <section className="col-50p">
          <h2 className="title"> Currency Settings</h2>
          {!!changedCurrency && (
            <SuccessModal msg={`Currency Setting has been changed to ${pipe.longName[changedCurrency]}`} back={back} />
          )}
          <CurrencyOptions currency={currency} setCurrency={setCurrency} />

          {currency !== 'EUR' && (
            <p>
              {`Note: You will be shown prices in ${CURR} on Amazin as a reference only. You may or may not be able to pay in ${CURR} see more details during checkout.`}
            </p>
          )}
        </section>
        <div className="col-50p"></div>
      </div>
      <div className="divider-inner"></div>

      <div className="container">
        <div className="col-50p p-1">
          <Button to={back} xs label="Cancel" />
          <Button primary xs label="Save Changes" onClick={submitChange} />
        </div>
      </div>
    </>
  );
}
