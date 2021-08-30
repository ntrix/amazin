import { memo, Suspense, useRef } from 'react';

import NavBtnDropdown from './NavBtnDropdown';
import { useBtnControl } from './useBtnControl';

function NavButton({ children, ...props }) {
  const focus = useRef(null);
  const { onHover, handleClick, setShadowSlow } = useBtnControl(focus);

  return (
    <NavBtnDropdown
      tabIndex="2"
      onMouseEnter={onHover}
      onClick={handleClick}
      onMouseLeave={(e) => {
        focus.current?.blur();
        e.target.blur();
        focus.current = null;
        setShadowSlow('');
      }}
      {...props}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </NavBtnDropdown>
  );
}

export default memo(NavButton);
