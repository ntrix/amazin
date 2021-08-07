import React from 'react';
import { Link } from 'react-router-dom';
import { RATES_SOURCE } from '../../../constants';
import { pipe, savePath } from '../../../utils';

export function _DropdownMenuCurrency({ currency }) {
  return (
    <ul className="dropdown__menu show">
      <li className="list-label">Change Currency</li>

      {['EUR', 'separator', ...pipe.currencies.slice(1)].map((label, id) => {
        if (label === 'separator')
          return <li key={id} className="separator ml-1"></li>;
        return (
          <li key={id}>
            <Link
              to={'/currency/cType/' + label}
              className={label === currency ? 'active' : ''}
              onClick={savePath('/curr')}
            >
              <div className="sprite__wrapper">
                <div className="sprite circle"></div>
                <span>{pipe.getName(label)}</span>
              </div>
            </Link>
          </li>
        );
      })}

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
