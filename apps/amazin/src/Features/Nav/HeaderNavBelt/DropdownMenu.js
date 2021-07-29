import React from 'react';
import MenuItem, { mapMenuItemProp } from '../components/MenuItem';
import { SHADOW } from '../../../constants';

const DropdownMenu = React.memo(({ show, ddMenuList }) => (
  <ul className={`dropdown__menu ${SHADOW.NAV_DD === show ? 'show' : ''}`}>
    {ddMenuList.map(mapMenuItemProp).map((props) => (
      <MenuItem {...props} />
    ))}
  </ul>
));

export default DropdownMenu;
