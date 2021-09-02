import { memo, useRef } from 'react';

import { SuspenseNull } from 'src/components/CustomSuspense';
import { useBtnControl } from './useBtnControl';
import NavBtnDropdown from './NavBtnDropdown';

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
      <SuspenseNull children={children} />
    </NavBtnDropdown>
  );
}

export default memo(NavButton);
