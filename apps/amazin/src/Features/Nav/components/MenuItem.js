import React from 'react';
import { Link } from 'react-router-dom';

import { useShadow } from '../../../utils/useShadow';

const InnerMenuItem = ({ label, to, className, extFunction }) => {
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

const _MenuItem = ({ label, ...props }) => {
  if (label === 'separator') return <div className="separator"></div>;
  return (
    <li>
      <InnerMenuItem label={label} {...props} />
    </li>
  );
};

export const mapMenuItemProp = ([label, to, className, extFunction]) => ({
  label,
  to,
  className,
  extFunction
});

const MenuItem = React.memo(_MenuItem);
export default MenuItem;
