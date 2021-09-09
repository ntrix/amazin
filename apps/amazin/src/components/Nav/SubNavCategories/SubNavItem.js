import { memo } from 'react';
import { useHistory } from 'react-router';

function SubNavItem({ _cat, category, getUrl, onPreload, changeCat }) {
  const history = useHistory();

  return (
    <li
      className={_cat === category ? 'active' : ''}
      onMouseEnter={onPreload ? () => onPreload(_cat) : null}
      onFocus={onPreload ? () => onPreload(_cat) : null}
      onClick={() => {
        if (changeCat) changeCat(_cat);
        if (getUrl) history.push(getUrl({ category: _cat, page: 1 }));
      }}
    >
      {_cat}
    </li>
  );
}

export default memo(SubNavItem);
