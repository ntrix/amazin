import CustomSelect from 'src/components/CustomSelect';
import { pipe } from 'src/utils';

export default function CurrencyOptions({ currency, setCurrency }) {
  const handleChange = (e) => {
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
