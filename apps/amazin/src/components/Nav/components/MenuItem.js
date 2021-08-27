import React from 'react';
import { useHistory } from 'react-router';

const InnerMenuItem = React.memo(
  ({ label, to, className, clearShadow, extFunction, children }) => {
    const history = useHistory();
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
          clearShadow('');
          if (extFunction) extFunction();
          history.push(to);
        }}
      >
        {children}
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

export const mapArgsToProps = (
  [label, to, className, extFunction = null],
  id
) => ({
  label,
  to,
  className,
  extFunction,
  key: `${id} ${label || className}`
});

export const NavCategoryAdapter = (cat) => [cat, '/search/category/' + cat];

const MenuItem = React.memo(
  _MenuItem,
  (prev, next) =>
    prev.label === next.label &&
    prev.to === next.to &&
    prev.className === next.className
);
export default MenuItem;
