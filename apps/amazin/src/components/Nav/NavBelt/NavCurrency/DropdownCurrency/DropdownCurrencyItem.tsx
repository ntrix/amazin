import React from 'react';
import { useHistory } from 'react-router';

import { pipe, savePath } from 'src/utils';

function DropdownCurrencyItem({ label, currency }: { label: CurrType; currency: CurrType }) {
  const history = useHistory();

  return (
    <li>
      <div
        className={`menu__link-item ${label === currency ? 'active' : ''}`}
        onClick={() => {
          savePath('/curr')();
          history.push('/currency/pCurrency/' + label);
        }}
      >
        <div className="sprite__wrapper">
          <div className="sprite circle" />
          <span>{pipe.longName[label]}</span>
        </div>
      </div>
    </li>
  );
}

export default React.memo(DropdownCurrencyItem);
