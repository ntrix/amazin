import React, { Suspense, useRef } from 'react';
import { SHADOW } from '../../../constants';
import { useShadow } from '../../../hooks/useShadow';
import NavDropdownBtn from './NavDropdownBtn';

function _NavBtnControl({ children, ...props }) {
  const { setShadowOf, setShadowSlow } = useShadow();
  const focus = useRef(null);
  const onHover = (e) => {
    focus.current?.blur();
    // simulate focus as onClick
    focus.current = e.target;
    e.target.focus();
    setShadowSlow(SHADOW.NAV_DD);
  };

  // UX behavior: a touch on mobile device acts as hover action on Desktop
  const handleClick = (e) => {
    focus.current?.blur();
    focus.current = e.target;
    setShadowOf(SHADOW.NAV_DD);
  };

  //TODO accessibility: isFocus & isEnterKeyPressed = onClick

  return (
    <NavDropdownBtn
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
    </NavDropdownBtn>
  );
}

const NavBtnControl = React.memo(_NavBtnControl);
export default NavBtnControl;
