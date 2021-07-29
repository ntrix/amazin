import React from 'react';
import createMenuItem from '../components/MenuItem';
import { SHADOW } from '../../../constants';

const DropdownMenu = React.memo(({ show, ddMenuList }) => (
  <ul className={`dropdown__menu ${SHADOW.NAV_DD === show ? 'show' : ''}`}>
    {ddMenuList.map(createMenuItem)}
  </ul>
));

export default DropdownMenu;
