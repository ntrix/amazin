import CustomSelect from 'src/components/CustomSelect';
import { pipe } from 'src/utils';

export type CurrencyOptionsProps = {
  currency: CurrType;
  setCurrency: SetStateType<CurrType>;
};

export default function CurrencyOptions({ currency, setCurrency }: CurrencyOptionsProps) {
  const handleChange = (e: EventType) => {
    e.stopPropagation();
    setCurrency(e.target.value);
  };

  const currencies = pipe.currencies.map((c) => ({
    value: c,
    children: `${pipe.symbol[c]} - ${c} - ${pipe.longName[c]}`
  }));

  return (
    <>
      <h2 className="title"> Currency Settings</h2>
      <CustomSelect
        label="Select the currency you want to shop with."
        wrapClass="col-50p"
        optgroup="Select Currency"
        list={currencies}
        value={currency}
        data-select="true"
        small
        onChange={handleChange}
      />
    </>
  );
}
