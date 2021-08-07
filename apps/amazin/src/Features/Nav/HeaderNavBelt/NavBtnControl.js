import React from 'react';
import { SHADOW } from '../../../constants';
import { useShadow } from '../../../utils/useShadow';
import NavDropdownBtn from './NavDropdownBtn';

function _NavBtnControl({ onMouseEnter, onMouseLeave, ...props }) {
  const { setShadowSlow } = useShadow('');
  // UX behavior: a touch on mobile device acts as hover
  return (
    <NavDropdownBtn
      tabindex="0"
      {...props}
      onMouseEnter={onMouseEnter || setShadowSlow(SHADOW.NAV_DD)}
      onClick={onMouseEnter || setShadowSlow(SHADOW.NAV_DD)}
      onMouseLeave={onMouseLeave || setShadowSlow()}
    />
  );
}

const NavBtnControl = React.memo(_NavBtnControl);
export default NavBtnControl;
