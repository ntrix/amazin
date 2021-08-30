import { memo } from 'react';

import { useHistory } from 'react-router';

function InnerMenuItem({ label, to, className, clearShadow, extFunction, children }) {
  const history = useHistory();

  if (!to) return className ? <div>{label}</div> : <strong>{label}</strong>;

  if (to === 'disabled') return <div className="menu__link-item disabled" disabled children={label} />;

  if (to.startsWith('https://')) return <a href={to} target="_blank" rel="noreferrer" children={label} />;

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

export default memo(InnerMenuItem);
