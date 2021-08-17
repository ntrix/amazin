import React, { Suspense, useRef } from 'react';
import { SHADOW } from '../../../constants';
import { useShadow } from '../../../utils/useShadow';
import NavDropdownBtn from './NavDropdownBtn';

function _NavBtnControl({ children, ...props }) {
  const { setShadowSlow } = useShadow();
  const focus = useRef(null);
  // UX behavior: a touch on mobile device acts as hover
  const handleClickOrHover = (e) => {
    focus.current?.blur();
    focus.current = e.target;
    e.target.focus();
    setShadowSlow(SHADOW.NAV_DD)();
  };

  //TODO accessibility: isFocus & isEnterKeyPressed = onClick

  return (
    <NavDropdownBtn
      tabIndex="2"
      onMouseEnter={handleClickOrHover}
      onClick={handleClickOrHover}
      onMouseLeave={(e) => {
        focus.current?.blur();
        e.target.blur();
        focus.current = null;
        setShadowSlow('')();
      }}
      {...props}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </NavDropdownBtn>
  );
}

const NavBtnControl = React.memo(_NavBtnControl);
export default NavBtnControl;
