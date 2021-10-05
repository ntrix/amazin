import { memo } from 'react';
import { useHistory } from 'react-router';
import { useShadow } from 'src/hooks/useShadow';
import Tooltip from '../Tooltip';

export type MenuItemProps = {
  label: string;
  to?: string;
  className?: string;
  extFunction?: FnType;
  children?: Children;
};

function InnerMenuItem({ label, to = '', className, extFunction, children }: MenuItemProps) {
  const history = useHistory();
  const { setShadowOf } = useShadow();

  switch (to.slice(0, 8)) {
    case '':
      return className ? <div>{label}</div> : <strong>{label}</strong>;

    case 'disabled':
      return <Tooltip text={to.slice(9)} children={<div className={'menu__link-item ' + to} children={label} />} />;

    case 'https://':
      return <a href={to} target="_blank" rel="noreferrer" children={label} />;

    default:
      return (
        <div
          className={'menu__link-item ' + className}
          aria-label={`${label} ${className}`}
          onClick={(e: EventType) => {
            e.stopPropagation();
            setShadowOf('');
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
