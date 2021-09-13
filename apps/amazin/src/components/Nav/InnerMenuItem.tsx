import { memo } from 'react';
import { useHistory } from 'react-router';
import { useShadow } from 'src/hooks/useShadow';

function InnerMenuItem({ label, to = '', className, extFunction, children }) {
  const history = useHistory();
  const { setShadowOf } = useShadow();

  switch (to.slice(0, 8)) {
    case '':
      return className ? <div>{label}</div> : <strong>{label}</strong>;

    case 'disabled':
      return <div className="menu__link-item disabled" children={label} />;

    case 'https://':
      return <a href={to} target="_blank" rel="noreferrer" children={label} />;

    default:
      return (
        <div
          className={'menu__link-item ' + className}
          aria-label={`${label} ${className}`}
          onClick={(e) => {
            e.stopPropagation();
            setShadowOf && setShadowOf('');
            extFunction && extFunction();
            history.push(to);
          }}
        >
          {children}
          {label}
        </div>
      );
  }
}

export default memo(InnerMenuItem);
