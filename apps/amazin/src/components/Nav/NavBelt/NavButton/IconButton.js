import { memo } from 'react';
import { useHistory } from 'react-router';

import { savePath } from 'src/utils';

function NavBtnFacade({ to, label, text, className, children }) {
  const history = useHistory();

  function handleClick() {
    savePath();
    history.push(to);
  }
  const [line1, line2] = text.split('^');

  return (
    <div className={'flex nav__' + label} tabIndex="2" aria-label={label} onClick={handleClick}>
      <div>
        {children}
        <div className={'sprite__' + label} />
      </div>
      <div className={className}>
        <div className="nav__line-1">{line1}</div>
        <div className="nav__line-2">{line2}</div>
      </div>
    </div>
  );
}

export default memo(NavBtnFacade);
