import React from 'react';
import { Link } from 'react-router-dom';

import { useShadow } from '../../../utils/useShadow';

const _MenuItem = ({ className, label, to, extFunction }) => {
  const { clearShadow } = useShadow('');

  if (!to && !className) return <strong>{label}</strong>;

  if (!to) return <div>{label}</div>;

  if (to === 'disabled')
    return (
      <Link to="#" className="disabled" disabled>
        {label}
      </Link>
    );

  if (to.startsWith('https://'))
    //a href instead of Link for extern links
    return (
      <a href={to} target="_blank" rel="noreferrer">
        {label}
      </a>
    );

  return (
    <Link
      to={to}
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        clearShadow();
        if (extFunction) extFunction();
      }}
    >
      {label}
    </Link>
  );
};

export const MenuItem = React.memo(_MenuItem);

const createMenuItem = ([label, to, className, extFunction], id) => {
  return label === 'separator' ? (
    <div key={id} className="separator"></div>
  ) : (
    <li key={id}>
      <MenuItem
        className={className}
        label={label}
        to={to}
        extFunction={extFunction}
      />
    </li>
  );
};

export default createMenuItem;
