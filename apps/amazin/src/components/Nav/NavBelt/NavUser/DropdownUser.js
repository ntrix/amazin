import { memo } from 'react';
import { SHADOW } from 'src/constants';
import { useShadow } from '../../../../hooks/useShadow';
import MenuItem, { mapArgsToProps } from '../../MenuItem';

function DropdownUser({ ddMenuList }) {
  const { shadowOf, setShadowOf } = useShadow();
  return (
    <ul className={`dropdown__menu ${SHADOW.NAV_DD === shadowOf ? 'show' : ''}`}>
      {ddMenuList.map(mapArgsToProps).map((props) => (
        <MenuItem {...props} clearShadow={setShadowOf} />
      ))}
    </ul>
  );
}

export default memo(DropdownUser);
