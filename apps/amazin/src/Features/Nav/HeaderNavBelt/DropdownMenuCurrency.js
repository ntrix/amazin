import React from 'react';
import { Link } from 'react-router-dom';
import { RATES_SOURCE } from '../../../constants';
import { pipe, savePath } from '../../../utils';

const DDMenuCurrencyItem = ({ label, currency }) => (
  <li>
    <Link
      to={'/currency/cType/' + label}
      className={label === currency ? 'active' : ''}
      onClick={savePath('/curr')}
    >
      <div className="sprite__wrapper">
        <div className="sprite circle"></div>
        <span>{pipe.longName[label]}</span>
      </div>
    </Link>
  </li>
);

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
        <Link to="#">€ - EUR - Euro</Link>
        <Link to="#">Base</Link>
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
