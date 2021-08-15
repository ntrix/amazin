import React, { Suspense } from 'react';
import { SHADOW } from '../../../constants';
import { useShadow } from '../../../utils/useShadow';
import NavDropdownBtn from './NavDropdownBtn';

function _NavBtnControl({ children, ...props }) {
  const { setShadowSlow } = useShadow();
  // UX behavior: a touch on mobile device acts as hover
  //TODO accessibility: isFocus & isEnterKeyPressed = onClick
  return (
    <NavDropdownBtn
      tabIndex="2"
      onMouseEnter={(e) => {
        e.target.focus();
        setShadowSlow(SHADOW.NAV_DD)();
      }}
      onClick={setShadowSlow(SHADOW.NAV_DD)}
      onMouseLeave={(e) => {
        e.target.blur();
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
