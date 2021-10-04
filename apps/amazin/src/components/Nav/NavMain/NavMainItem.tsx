import { memo } from 'react';
import { useHistory } from 'react-router';

import { useShadow } from 'src/hooks/useShadow';

export type NavMainItemProps = {
  label?: string;
  to?: string;
  children?: Children;
};

function NavMainItem({ label = '', to = '/', children }: NavMainItemProps) {
  const history = useHistory();
  const { setShadowOf } = useShadow();

  return (
    <div className="nav-main__item">
      <div
        onClick={() => {
          setShadowOf('');
          history.push(to);
        }}
      >
        {children || label}
      </div>
    </div>
  );
}

export default memo(NavMainItem);
