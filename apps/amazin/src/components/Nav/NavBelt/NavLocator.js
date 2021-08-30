import { useHistory } from 'react-router';

import { savePath } from 'src/utils';

function NavLocator({ to }) {
  const history = useHistory();

  const handleClick = () => {
    savePath();
    history.push(to);
  };

  return (
    <div className="nav__locator flex" aria-label="Address Locator" onClick={handleClick}>
      <div className="sprite__locator"></div>
      <div className="tablet--off">
        <div className="nav__line-1">Deliver to your</div>
        <div className="nav__line-2">Location?</div>
      </div>
    </div>
  );
}

export default NavLocator;
