import { pipe } from 'src/utils';

export default function CurrencyOptions({ currency, setCurrency }) {
  const handleChange = (e) => {
    e.stopPropagation();
    setCurrency(e.target.value);
  };

  return (
    <>
      <p>Select the currency you want to shop with.</p>
      <div className="select-wrapper col-50p">
        <div className="sprite__caret"></div>
        <select id="currency" value={currency} data-select="true" onChange={handleChange}>
          <optgroup label="Select Currency">
            {pipe.currencies.map((c, id) => (
              <option value={c} key={id}>
                {pipe.symbol[c]} - {c} - {pipe.longName[c]}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
    </>
  );
}
