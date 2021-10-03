import { memo } from 'react';
import { useHistory } from 'react-router';

export type SubNavItemProps = {
  _cat?: string;
  category?: string;
  getUrl?: FnType;
  onPreload?: FnType;
  changeCat?: SetState;
};

function SubNavItem({ _cat, category, getUrl, onPreload, changeCat }: SubNavItemProps) {
  const history = useHistory();

  return (
    <li
      className={_cat === category ? 'active' : ''}
      onMouseEnter={onPreload ? () => onPreload(_cat) : undefined}
      onFocus={onPreload ? () => onPreload(_cat) : undefined}
      onClick={() => {
        changeCat && changeCat(_cat);
        getUrl && history.push(getUrl({ category: _cat, page: 1 }));
      }}
    >
      {_cat}
    </li>
  );
}

export default memo(SubNavItem);
