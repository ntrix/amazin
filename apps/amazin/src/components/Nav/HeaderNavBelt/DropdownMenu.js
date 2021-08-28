import React from 'react';
import MenuItem, { mapArgsToProps } from '../MenuItem';

const _DropdownMenu = ({ show, ddMenuList, clearShadow }) => {
  return (
    <ul className={`dropdown__menu ${show ? 'show' : ''}`}>
      {ddMenuList.map(mapArgsToProps).map((props) => (
        <MenuItem {...props} clearShadow={clearShadow} />
      ))}
    </ul>
  );
};

const DropdownMenu = React.memo(_DropdownMenu);
export default DropdownMenu;
