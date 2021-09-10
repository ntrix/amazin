import { memo } from 'react';
import IconButton from './NavButton/IconButton';

function NavLocator({ to }) {
  return <IconButton label="locator" to={to} className="tablet--off" text="Deliver to your^Location?" />;
}

export default memo(NavLocator);
