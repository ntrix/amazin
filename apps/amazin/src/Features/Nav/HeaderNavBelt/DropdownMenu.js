import React from 'react';
import { MenuItem } from '../components/MenuItem';
import { SHADOW } from '../../../constants';

const DropdownMenu = React.memo(({ show, ddMenuList }) => (
  <ul className={`dropdown__menu ${SHADOW.NAV_DD === show ? 'show' : ''}`}>
    {ddMenuList.map(MenuItem)}
  </ul>
));

export default DropdownMenu;
