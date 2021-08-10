import React from 'react';
import { SHADOW } from '../../../constants';
import { useShadow } from '../../../utils/useShadow';
import NavDropdownBtn from './NavDropdownBtn';

function _NavBtnControl(props) {
  const { setShadowSlow } = useShadow('');
  // UX behavior: a touch on mobile device acts as hover
  //TODO accessibility: isFocus & isEnterKeyPressed = onClick
  return (
    <NavDropdownBtn
      tabIndex="2"
      onMouseEnter={setShadowSlow(SHADOW.NAV_DD)}
      onClick={setShadowSlow(SHADOW.NAV_DD)}
      onMouseLeave={setShadowSlow('')}
      {...props}
    />
  );
}

const NavBtnControl = React.memo(_NavBtnControl);
export default NavBtnControl;
