import { memo } from 'react';

import { pipe } from 'src/utils';
import DropdownCurrencyItem from './DropdownCurrencyItem';
import CurrencyRate from './CurrencyRate';

function DropdownCurrency({ currency }) {
  return (
    <ul className="dropdown__menu show">
      <li className="list-label">Change Currency</li>
      <DropdownCurrencyItem label="EUR" currency={currency} />
      <li className="separator ml-1"></li>

      {pipe.currencies.slice(1).map((label, id) => (
        <DropdownCurrencyItem key={id} label={label} currency={currency} />
      ))}
      <li className="separator" />

      <CurrencyRate currency={currency} />
    </ul>
  );
}

export default memo(DropdownCurrency);
