import React from 'react';
import MenuItem, { mapArgsToProps } from '../components/MenuItem';
import { SHADOW } from '../../../constants';

const _DropdownMenu = ({ show, ddMenuList }) => (
  <ul className={`dropdown__menu ${SHADOW.NAV_DD === show ? 'show' : ''}`}>
    {ddMenuList.map(mapArgsToProps).map((props) => (
      <MenuItem {...props} />
    ))}
  </ul>
);

const DropdownMenu = React.memo(_DropdownMenu);
export default DropdownMenu;
