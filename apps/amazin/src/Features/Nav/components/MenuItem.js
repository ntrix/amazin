import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { useShadow } from '../../../utils/useShadow';

const InnerMenuItem = React.memo(
  ({ label, to, className, extFunction = null }) => {
    const history = useHistory();
    const { setShadowOf } = useShadow('');
    const [extFn] = useState(() => (extFunction ? extFunction : null));
    if (!to && !className) return <strong>{label}</strong>;

    if (!to) return <div>{label}</div>;

    if (to === 'disabled')
      return (
        <div className="menu__link-item disabled" disabled>
          {label}
        </div>
      );

    if (to.startsWith('https://'))
      //a href instead of Link for extern links
      return (
        <a href={to} target="_blank" rel="noreferrer">
          {label}
        </a>
      );

    return (
      <div
        className={'menu__link-item ' + className}
        aria-label={label || className}
        onClick={(e) => {
          e.stopPropagation();
          setShadowOf('');
          if (extFn) extFn();
          history.push(to);
        }}
      >
        {label}
      </div>
    );
  }
);

const _MenuItem = ({ label, ...props }) => {
  if (label === 'separator') return <li className="separator"></li>;

  return (
    <li>
      <InnerMenuItem label={label} {...props} />
    </li>
  );
};

export const mapMenuItemProp = (
  [label, to, className, extFunction = null],
  id
) => ({
  label,
  to,
  className,
  extFunction,
  key: `${id} ${label || className}`
});

const MenuItem = React.memo(
  _MenuItem,
  (prev, next) =>
    prev.label === next.label &&
    prev.to === next.to &&
    prev.className === next.className
);
export default MenuItem;
