import MenuItem from '../MenuItem';

function SidebarHeader({ userName, ...props }) {
  return (
    <ul>
      <MenuItem
        label={'Hello, ' + userName}
        to="/profile"
        className="sidebar__header"
        {...props}
      >
        <div className="sprite__user"></div>
      </MenuItem>
    </ul>
  );
}

export default SidebarHeader;
