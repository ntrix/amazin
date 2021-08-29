import { memo } from 'react';
import { OutlineProvider, useOutline } from '../../../hooks/useOutline';
import SearchBox from './SearchBox';
import { useOutsideClick } from './useOutsideClick';

function NavSearch() {
  const { outline } = useOutline();
  const NavSearchRef = useOutsideClick();
  return (
    <div ref={NavSearchRef} className="nav__search">
      <SearchBox className={`search-box ${outline ? 'focus' : ''}`} />
    </div>
  );
}
const NavSearchMemo = memo(NavSearch);

function NavSearchWithOutline() {
  return (
    <OutlineProvider>
      <NavSearchMemo />
    </OutlineProvider>
  );
}
export default memo(NavSearchWithOutline);
