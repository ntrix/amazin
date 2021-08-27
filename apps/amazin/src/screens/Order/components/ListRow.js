import React from 'react';
import { pipe } from '../../../utils';

const ListRow = ({ label, toShow, active }) => (
  <>
    {(toShow || toShow === 0) && (
      <li>
        <div className={`row ${active ? 'active' : ''}`}>
          <div>{label}</div>
          <div>{pipe.showPrice(toShow)}</div>
        </div>
      </li>
    )}{' '}
  </>
);

export default ListRow;
