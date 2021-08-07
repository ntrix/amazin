import React from 'react';
import { Link } from 'react-router-dom';

import { useShadow } from '../../../utils/useShadow';

const _MenuItem = ({ label, to, className, extFunction }) => {
  const { setShadowOf } = useShadow('');
  const innerMenuItem = () => {
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
        aria-label={label || className}
        onClick={(e) => {
          e.stopPropagation();
          setShadowOf('');
          if (extFunction) extFunction();
        }}
      >
        {label}
      </Link>
    );
  };

  if (label === 'separator') return <li className="separator"></li>;

  return !to && !className ? (
    <li>
      <strong>{label}</strong>
    </li>
  ) : (
    <li>{innerMenuItem()}</li>
  );
};

export const mapMenuItemProp = ([label, to, className, extFunction], key) => ({
  label,
  to,
  className,
  extFunction,
  key
});

const MenuItem = React.memo(_MenuItem);
export default MenuItem;
