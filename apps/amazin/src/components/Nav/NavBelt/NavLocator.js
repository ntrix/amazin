import { memo } from 'react';
import NavBtnFacade from './NavButton/NavBtnFacade';

function NavLocator({ to }) {
  return <NavBtnFacade label="locator" to={to} className="tablet--off" text="Deliver to your^Location?" />;
}

export default memo(NavLocator);
