import React from 'react';

import { RATES_SOURCE } from 'src/constants';

function CurrencyRate({ currency }: { currency: string }) {
  return (
    <>
      <li className="list-label">Currency Calculator</li>
      <li className="calculator disabled">
        <div>€ - EUR - Euro</div>
        <div>Base</div>
      </li>
      <li className="separator" />
      <li className="list-label">
        <a href={RATES_SOURCE} target="_blank" rel="noreferrer">
          <div className="sprite__wrapper">
            <div className={`sprite flag xl ${currency}`} />
            <span>Exchange Reference Rates</span>
          </div>
        </a>
      </li>
    </>
  );
}

export default React.memo(CurrencyRate);
