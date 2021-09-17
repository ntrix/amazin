import { memo } from 'react';

import MenuItem from '../MenuItem';

function SidebarHeader({ userName, ...rest }: { userName: string; rest?: Props }) {
  return (
    <ul>
      <MenuItem label={'Hello, ' + userName} to="/profile" className="sidebar__header" {...rest}>
        <div className="sprite__user" />
      </MenuItem>
    </ul>
  );
}

export default memo(SidebarHeader);
