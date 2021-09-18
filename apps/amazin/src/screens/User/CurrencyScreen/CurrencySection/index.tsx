import { pipe } from 'src/utils';
import { useCurrency } from './useCurrency';
import Button from 'src/components/Button';
import CurrencyOptions from './CurrencyOptions';
import SuccessModal from 'src/components/SuccessModal';

export default function CurrencySection() {
  const { SHOW_CURR, back, currency, setCurrency, isChanged, submitChange } = useCurrency();
  return (
    <>
      <div className="container currencies">
        <section className="col-50p">
          {isChanged && <SuccessModal msg={`Currency has been changed to ${pipe.longName[currency]}`} back={back} />}
          <CurrencyOptions currency={currency} setCurrency={setCurrency} />

          {currency !== 'EUR' && (
            <p>
              {`Note: You will be shown prices in ${SHOW_CURR} on Amazin as a reference only. You may or may not be able to pay in ${SHOW_CURR} see more details during checkout.`}
            </p>
          )}
        </section>
        <div className="col-50p" />
      </div>
      <div className="divider-inner" />

      <div className="container">
        <div className="col-50p p-1">
          <Button to={back} xs label="Cancel" />
          <Button primary xs label="Save Changes" onClick={submitChange} />
        </div>
      </div>
    </>
  );
}
