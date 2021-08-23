import { shortName } from 'src/utils';
import MenuItem from '../components/MenuItem';

function SidebarHeader({ userName }) {
  return (
    <ul>
      <MenuItem
        label={'Hello, ' + shortName(userName)}
        to="/profile"
        className="sidebar__header"
      >
        <div className="sprite__user"></div>
      </MenuItem>
    </ul>
  );
}

export default SidebarHeader;
