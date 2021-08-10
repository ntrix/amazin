import React from 'react';
import { Link } from 'react-router-dom';

const FilterListItem =
  (getUrlFunction) =>
  ({ filter, active = false, text, children, ...props }) =>
    (
      <li>
        <Link
          {...props}
          className={active ? 'active' : ''}
          to={getUrlFunction(filter)}
        >
          {text || children}
        </Link>
      </li>
    );

export default FilterListItem;
