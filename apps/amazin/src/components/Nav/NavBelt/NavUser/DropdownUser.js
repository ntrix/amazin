import React from 'react';
import MenuItem, { mapArgsToProps } from '../../MenuItem';

function DropdownUser({ show, ddMenuList, clearShadow }) {
  return (
    <ul className={`dropdown__menu ${show ? 'show' : ''}`}>
      {ddMenuList.map(mapArgsToProps).map((props) => (
        <MenuItem {...props} clearShadow={clearShadow} />
      ))}
    </ul>
  );
}

export default React.memo(DropdownUser);
