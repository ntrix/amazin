import React from 'react';
import { useHistory } from 'react-router';
import { RATES_SOURCE } from '../../../constants';
import { pipe, savePath } from '../../../utils';

const DDMenuCurrencyItem = ({ label, currency }) => {
  const history = useHistory();
  return (
    <li>
      <div
        className={`menu__link-item ${label === currency ? 'active' : ''}`}
        onClick={() => {
          savePath('/curr')();
          history.push('/currency/cType/' + label);
        }}
      >
        <div className="sprite__wrapper">
          <div className="sprite circle"></div>
          <span>{pipe.longName[label]}</span>
        </div>
      </div>
    </li>
  );
};

export function _DropdownMenuCurrency({ currency }) {
  return (
    <ul className="dropdown__menu show">
      <li className="list-label">Change Currency</li>
      <DDMenuCurrencyItem label="EUR" currency={currency} />
      <li className="separator ml-1"></li>
      {pipe.currencies.slice(1).map((label, id) => (
        <DDMenuCurrencyItem key={id} label={label} currency={currency} />
      ))}
      <li className="separator"></li>
      <li className="list-label">Currency Calculator</li>
      <li className="calculator disabled">
        <div className="disabled">€ - EUR - Euro</div>
        <div className="disabled">Base</div>
      </li>
      <li className="separator"></li>
      <li className="list-label">
        <a href={RATES_SOURCE} target="_blank" rel="noreferrer">
          <div className="sprite__wrapper">
            <div className={`sprite flag xl ${currency}`}></div>
            <span>Exchange Reference Rates</span>
          </div>
        </a>
      </li>
    </ul>
  );
}

const DropdownMenuCurrency = React.memo(_DropdownMenuCurrency);
export default DropdownMenuCurrency;
