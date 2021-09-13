import { memo } from 'react';
import { SHADOW } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';
import MenuItem, { mapArgsToProps } from '../../MenuItem';

function DropdownUser({ ddMenuList }: { ddMenuList: MenuType }) {
  const { shadowOf } = useShadow();
  return (
    <ul className={`dropdown__menu ${SHADOW.NAV_DD === shadowOf ? 'show' : ''}`}>
      {ddMenuList.map((args, id) => (
        <MenuItem {...mapArgsToProps(args, id)} />
      ))}
    </ul>
  );
}

export default memo(DropdownUser);
